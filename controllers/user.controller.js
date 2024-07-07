import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'

import jwt from 'jsonwebtoken'

const prisma = prismaInstance

// create login username and password for user account with jwt token
export default class User {
  static async CreateUserAccount(req, res) {
    const { user_name, password, role } = req.body

    const created_user = await prisma.users.create({
      data: {
        user_name,
        password,
        role,
      },
    })

    res.status(200).send(created_user)
  }

  static async GetUsers(req, res) {
    const users = await prisma.users.findMany()

    res.status(200).send(users)
  }

  static async GetUsersById(req, res) {
    const { id } = req.params

    console.log(id)

    const user = await prisma.users.findUnique({
      where: {
        user_id: id,
      },
    })

    if (!user) {
      return res.status(404).send('User not found')
    }

    res.status(200).send(user)
  }

  static async UpdateUser(req, res) {
    const { id } = req.params
    const { user_name, password, role } = req.body

    const updated_user = await prisma.users.update({
      where: {
        user_id: Number(id),
      },
      data: {
        user_name,
        password,
        role,
      },
    })

    res.status(200).send(updated_user)
  }

  static async DeleteUser(req, res) {
    const { id } = req.params

    await prisma.users.delete({
      where: {
        user_id: Number(id),
      },
    })

    res.status(204).send()
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
