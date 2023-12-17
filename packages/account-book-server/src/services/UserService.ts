import bcrypt from 'bcrypt'
import db from '../lib/db'
import AppError, { isAppError } from '../lib/AppError'
import {
  generateToken,
  RefreshTokenPayload,
  validateToken,
} from '../lib/tokens'
import { User } from '@prisma/client'

const SALT_ROUNDS = 10

type RegisterParams = {
  email: string
  password: string
  username: string
}

type LoginParams = Omit<RegisterParams, 'username'>

class UserService {
  private static instance: UserService
  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async createTokenId(userId: string) {
    const token = await db.token.create({
      data: {
        userId,
      },
    })
    return token.id
  }

  async generateToken(user: User, existingTokenId?: string) {
    const { id: userId, username, email } = user
    const tokenId = existingTokenId ?? (await this.createTokenId(userId))

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId,
        username,
        email,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId,
        rotationCounter: 1,
      }),
    ])

    return { accessToken, refreshToken }
  }

  async refreshTokens(token: string) {
    try {
      const { tokenId } = await validateToken<RefreshTokenPayload>(token)
      const tokenItem = await db.token.findUnique({
        where: {
          id: tokenId,
        },
        include: {
          user: true,
        },
      })
      if (!tokenItem) {
        throw new Error('Token not found')
      }
      return this.generateToken(tokenItem.user, tokenId)
    } catch (error) {
      throw new AppError('RefreshTokenError')
    }
  }

  async register({ email, password, username }: RegisterParams) {
    const exists = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (exists) {
      throw new AppError('UserExistsError')
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await db.user.create({
      data: {
        email,
        username,
        passwordHash: hash,
      },
    })
    const tokens = await this.generateToken(user)

    return {
      tokens,
      user,
    }
  }

  async login({ email, password }: LoginParams) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new AppError('AuthenticationError')
    }

    try {
      const result = await bcrypt.compare(password, user.passwordHash)
      if (!result) {
        throw new AppError('AuthenticationError')
      }
    } catch (error) {
      if (isAppError(error)) {
        throw error
      }
      throw new AppError('UnknownError')
    }

    const tokens = await this.generateToken(user)

    return {
      tokens,
      user,
    }
  }
}

export default UserService
