import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'
import moment from 'moment'

const prisma = prismaInstance

// installment_id     Int      @id @default(autoincrement())
//   installment_date   String?
//   installment_title  String?
//   installment_amount String?
//    isPaid           Boolean? @default(false)
//   projectId          Int

export default class Installment {
  static async CreateInstallment(req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Content can not be empty!',
      })
    }

    try {
      const installmentData = await prisma.installments.create({
        data: {
          installment_date: moment().format('YYYY-MM-DD'),
          installment_title: req.body.installment_title,
          installment_amount: req.body.installment_amount,
          installment_paid: req.body.installment_paid,
          installment_due: moment().format('YYYY-MM-DD'),
          project: {
            connect: {
              project_id: req.body.projectId,
            },
          },
        },
      })

      res.status(201).json(installmentData)
    } catch (error) {
      res.status(500).send(prismaErrorHandling(error))
      console.log(error)
    }
  }

  static async GetProjectInstallments(req, res) {
    try {
      const projectInstallments = await prisma.installments.findMany({
        where: {
          projectId: parseInt(req.params.id),
        },
        include: {
          project: true,
        },
      })

      res.status(200).json(projectInstallments)
    } catch (error) {
      res.status(500).send(prismaErrorHandling(err))
      console.log(error)
    }
  }

  static async GetInstallment(req, res) {
    try {
      const installment = await prisma.installments.findMany({
        include: {
          project: true,
        },
      })

      res.status(200).json(installment)
    } catch (error) {
      res.status(500).send(prismaErrorHandling(err))
      console.log(error)
    }
  }

  static async UpdateInstallment(req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Content can not be empty!',
      })
    }

    try {
      const installment = await prisma.installments.update({
        where: {
          installment_id: parseInt(req.params.id),
        },
        data: {
          installment_date: moment(req.body.installment_date).format(
            'YYYY-MM-DD',
          ),
          installment_title: req.body.installment_title,
          installment_amount: req.body.installment_amount,
          installment_paid: req.body.installment_paid,
          installment_due: moment(req.body.installment_due).format(
            'YYYY-MM-DD',
          ),
        },
      })

      res.status(200).json(installment)
    } catch (error) {
      res.status(500).send(prismaErrorHandling(error))
      console.log(error)
    }
  }

  static async DeleteInstallment(req, res) {
    try {
      const installment = await prisma.installments.delete({
        where: {
          installment_id: parseInt(req.params.id),
        },
      })

      res.status(200).json(installment)
    } catch (error) {
      res.status(500).send(prismaErrorHandling(err))
      console.log(error)
    }
  }
}
