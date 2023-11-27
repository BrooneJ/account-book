import bcrypt from 'bcrypt'
import db from '../lib/db'
import AppError from '../lib/AppError'

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

    return user
  }

  login() {
    return 'logged in!'
  }
}

export default UserService
