import path from 'path'
import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'

import multer from 'multer'

import fs from 'fs'

const prisma = prismaInstance

export default class Files {
  static async UploadFile(req, res) {
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
      const newFileName =
        req.body.file_name +
        '-' +
        Date.now() +
        path.extname(req.file.originalname)
      const newPath = 'uploads/' + newFileName

      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
      })

      const create_files = await prisma.files.create({
        data: {
          file_name: newFileName,
          projectId: parseInt(req.body.projectId),
          sectionId: parseInt(req.body.sectionId),
        },
      })

      res.status(200).send(create_files)
    })
  }

  static async GetFiles(req, res) {
    const get_files = await prisma.files.findMany({
      where: {
        projectId: parseInt(req.params.projectId),
        sectionId: parseInt(req.params.sectionId),
      },
    })

    res.status(200).send(get_files)
  }

  static async GetFilesById(req, res) {
    const get_files = await prisma.files.findFirst({
      where: {
        file_id: parseInt(req.params.id),
      },
    })

    res.status(200).send(get_files)
  }

  static async DeleteFile(req, res) {
    const deleted_file = await prisma.files.findFirst({
      where: {
        file_id: parseInt(req.params.id),
      },
    })

    fs.unlink('uploads/' + deleted_file.file_name, function (err) {
      if (err) throw err
    })

    const delete_files = await prisma.files.delete({
      where: {
        file_id: parseInt(req.params.id),
      },
    })

    res.status(200).send(delete_files)
  }
}
