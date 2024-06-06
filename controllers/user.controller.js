import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'

import jwt from 'jsonwebtoken'

const prisma = prismaInstance

// create login username and password for user account with jwt token
export default class User {
  static async CreateUserAccount(req, res) {
    const { username, password, role } = req.body

    const created_user = await prisma.users.create({
      data: {
        username,
        password,
        role,
      },
    })

    res.status(200).send(created_user)
  }

  static async LoginUserAccount(req, res) {
    const { username, password } = req.body

    const user = await prisma.users.findFirst({
      where: {
        user_name: username,
      },
    })

    if (!user) {
      return res.status(404).send('User not found')
    }

    if (user.password !== password) {
      return res.status(401).send('Unauthorized')
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    res.status(200).json({
      user: decoded.user,
      token,
    })
  }
}
