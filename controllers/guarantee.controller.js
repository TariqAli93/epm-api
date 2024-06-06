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
        'uploads/' + req.body.new_filename + path.extname(req.file.originalname)

      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
      })

      const created_guarantee = await prisma.guarantee.create({
        data: {
          start_date: req.body.start_date,
          end_date: req.body.end_date,
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
}
