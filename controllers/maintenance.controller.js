import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'

import fs from 'fs'

import path from 'path'

import multer from 'multer'

const prisma = prismaInstance

export default class Maintenance {
  static async CreateMaintenance(req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      },
    })

    if (req.file === undefined) {
      await prisma.maintenance.create({
        data: {
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          projectId: req.body.projectId * 1,
        },
      })

      return res.status(200).send('Maintenance created successfully')
    } else {
      const upload_process = multer({ storage: storage })

      const upload = upload_process.single('file')

      upload(req, res, async (err) => {
        if (err) return res.status(500).send(err)

        const oldPath = 'uploads/' + req.file.filename
        const newPath =
          'uploads/' +
          req.body.new_filename +
          path.extname(req.file.originalname)

        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err
        })

        const created_maintenance = await prisma.maintenance.create({
          data: {
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            projectId: req.body.projectId * 1,
            maintenance_file: {
              create: {
                file_name: newPath,
              },
            },
          },
        })

        res.status(200).send(created_maintenance)
      })
    }
  }

  static async UpdateMaintenance(req, res) {
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

      const created_maintenance = await prisma.maintenance.update({
        data: {
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          maintenance_file: {
            create: {
              file_name: newPath,
            },
          },
        },

        where: {
          maintenance_id: parseInt(req.params.id),
        },
      })

      res.status(200).send(created_maintenance)
    })
  }

  static async GetMaintenance(req, res) {
    const maintenance = await prisma.maintenance.findMany()

    res.status(200).send(maintenance)
  }

  static async GetMaintenanceById(req, res) {
    const { id } = req.params

    const maintenance = await prisma.maintenance.findUnique({
      where: {
        maintenance_id: Number(id),
      },
    })

    if (!maintenance) {
      return res.status(404).send('Maintenance not found')
    }

    res.status(200).send(maintenance)
  }

  static async DeleteMaintenance(req, res) {
    const { id } = req.params

    await prisma.maintenance.delete({
      where: {
        maintenance_id: Number(id),
      },
    })

    res.status(200).send('Maintenance deleted successfully')
  }
}
