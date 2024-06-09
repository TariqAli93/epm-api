import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'
import path from 'path'
import fs from 'fs'

import multer from 'multer'

const prisma = prismaInstance

export default class Insurance {
  static async CreateInsurance(req, res) {
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

      const created_insurance = await prisma.insurance.create({
        data: {
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          insurance_number: req.body.insurance_number * 1,
          projectId: req.body.projectId * 1,
          insurance_file: {
            create: {
              file_name: newPath,
            },
          },
        },
      })

      res.status(200).send(created_insurance)
    })
  }

  static async UpdateInsurance(req, res) {
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

      const created_insurance = await prisma.insurance.update({
        data: {
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          insurance_number: req.body.insurance_number * 1,
          insurance_file: {
            create: {
              file_name: newPath,
            },
          },
        },

        where: {
          insurance_id: parseInt(req.params.id),
        },
      })

      res.status(200).send(created_insurance)
    })
  }

  static async DeleteInsurance(req, res) {
    const insurance_file = await prisma.insurance_file.findFirst({
      where: {
        insuranceId: parseInt(req.params.id),
      },
    })

    fs.unlink(insurance_file.file_name, (err, file) => {
      if (err) console.error(err)
    })

    const deleted_insurance = await prisma.insurance.delete({
      where: {
        insurance_id: parseInt(req.params.id),
      },
    })

    res.status(200).send(deleted_insurance)
  }
}
