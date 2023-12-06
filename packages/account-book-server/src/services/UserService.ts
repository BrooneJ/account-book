import bcrypt from 'bcrypt'
import db from '../lib/db'
import AppError, { isAppError } from '../lib/AppError'
import { generateToken } from '../lib/tokens'
import { User } from '@prisma/client'

const SALT_ROUNDS = 10

interface AuthParams {
  email: string
  password: string
  username: string
}

class UserService {
  private static instance: UserService
  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async generateToken(user: User) {
    const { id: userId, username, email } = user
    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId: 1,
        username,
        email,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId: 1,
        rotationCounter: 1,
      }),
    ])

    return { accessToken, refreshToken }
  }

  async register({ email, password, username }: AuthParams) {
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

  async login({ email, password, username }: AuthParams) {
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
