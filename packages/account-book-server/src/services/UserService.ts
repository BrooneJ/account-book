import bcrypt from 'bcrypt'
import db from '../lib/db'
import AppError from '../lib/AppError'
import { generateToken } from '../lib/tokens'

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

  async generateToken(userId: string, username: string) {
    // refactor above code with Promise.all
    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId: 1,
        username,
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
    const tokens = await this.generateToken(user.id, username)

    return {
      tokens,
      user,
    }
  }

  login() {
    return 'logged in!'
  }
}

export default UserService
