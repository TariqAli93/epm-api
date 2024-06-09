import path from 'path'
import fs from 'fs'
import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'

import multer from 'multer'

const prisma = prismaInstance

export default class Guarantee {
  static async CreateGuarantee(req, res) {
    // upload
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      },
    })

    const upload_process = multer({ storage: storage })

    const upload = upload_process.single('file')

    upload(req, res, async (err) => {
      if (err) return res.status(500).send(err)

      const oldPath = 'uploads/' + req.file.filename
      const newPath =
        'uploads/' +
        req.body.projectId +
        '-' +
        'خطاب ضمان' +
        path.extname(req.file.originalname)

      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
      })

      const created_guarantee = await prisma.guarantee.create({
        data: {
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          guarantee_number: req.body.guarantee_number * 1,
          projectId: parseInt(req.body.projectId),
          guarantee_file: {
            create: {
              file_name: newPath,
            },
          },
        },
      })

      res.status(200).send(created_guarantee)
    })
  }

  static async UpdateGuarantee(req, res) {
    // upload
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      },
    })

    const upload_process = multer({ storage: storage })

    const upload = upload_process.single('file')

    upload(req, res, async (err) => {
      if (err) return res.status(500).send(err)

      const oldPath = 'uploads/' + req.file.filename
      const newPath =
        'uploads/' + req.body.new_filename + path.extname(req.file.originalname)

      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
      })

      const created_guarantee = await prisma.guarantee.update({
        data: {
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          guarantee_number: req.body.guarantee_number * 1,
          guarantee_file: {
            create: {
              file_name: newPath,
            },
          },
        },

        where: {
          guarantee_id: parseInt(req.params.id),
        },
      })

      res.status(200).send(created_guarantee)
    })
  }

  static async GetGuarantee(req, res) {
    const guarantee = await prisma.guarantee.findUnique({
      where: {
        guarantee_id: parseInt(req.params.id),
      },
    })

    res.status(200).send(guarantee)
  }

  static async GetAllGuarantees(req, res) {
    const guarantees = await prisma.guarantee.findMany()

    res.status(200).send(guarantees)
  }

  static async DeleteGuarantee(req, res) {
    const guarantee_file = await prisma.guarantee_file.findFirst({
      where: {
        guaranteeId: parseInt(req.params.id),
      },
    })

    fs.unlink(guarantee_file.file_name, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })

    const guarantee = await prisma.guarantee.delete({
      where: {
        guarantee_id: parseInt(req.params.id),
      },

      include: {
        guarantee_file: true,
      },
    })

    res.status(200).send(guarantee)
  }
}
