import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'
import path from 'path'
import multer from 'multer'
import fs from 'fs'

const prisma = prismaInstance

// company_name  String
// createdAt     DateTime        @default(now())
// updatedAt     DateTime        @updatedAt
// company_files company_files[]

// file_name       String
// file_path       String
// companyId       Int
export default class company {
  // create comapny
  static async createCompany(req, res) {
    const { company_name } = req.body
    try {
      const newCompany = await prisma.company.create({
        data: {
          company_name,
        },
      })
      res.status(201).json(newCompany)
    } catch (error) {
      res.status(500).json(prismaErrorHandling(error))
      console.error(error)
    }
  }

  // get all companies
  static async getCompanies(req, res) {
    try {
      const companies = await prisma.company.findMany()
      res.status(200).json(companies)
    } catch (error) {
      res.status(500).json(prismaErrorHandling(error))
      console.error(error)
    }
  }

  // get company by id
  static async getCompanyById(req, res) {
    const { id } = req.params
    try {
      const company = await prisma.company.findUnique({
        where: {
          id: parseInt(id),
        },
      })
      res.status(200).json(company)
    } catch (error) {
      res.status(500).json(prismaErrorHandling(error))
      console.error(error)
    }
  }

  // update company by id
  static async updateCompany(req, res) {
    const { id } = req.params
    const { company_name } = req.body
    try {
      const updatedCompany = await prisma.company.update({
        where: {
          id: parseInt(id),
        },
        data: {
          company_name,
        },
      })
      res.status(200).json(updatedCompany)
    } catch (error) {
      res.status(500).json(prismaErrorHandling(error))
      console.error(error)
    }
  }

  // delete company by id
  static async deleteCompany(req, res) {
    const { id } = req.params
    try {
      await prisma.company.delete({
        where: {
          id: parseInt(id),
        },
      })
      res.status(204).end()
    } catch (error) {
      res.status(500).json(prismaErrorHandling(error))
      console.error(error)
    }
  }

  // company files
  // create company file
  static async createCompanyFile(req, res) {
    const { file_name, file_path, companyId } = req.body

    const generateRandomAlphaName = (length = 5) => {
      let name = ''
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length)
        name += alphabet[randomIndex]
      }

      return name
    }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        cb(
          null,
          Date.now() +
            '-' +
            '-' +
            generateRandomAlphaName(6) +
            path.extname(file.originalname),
        )
      },
    })

    const upload_process = multer({ storage: storage })

    const upload = upload_process.single('file')

    upload(req, res, async (err) => {
      if (err) return res.status(500).send(err)

      const newFileName = req.body.file_name
      const newPath = 'uploads/' + req.file.filename

      const create_files = await prisma.company_files.create({
        data: {
          file_name: newFileName,
          file_path: newPath,
          company: {
            connect: {
              company_id: parseInt(req.body.companyId),
            },
          },
        },
      })

      res.status(200).send(create_files)
    })
  }

  // get company files
  static async getCompanyFiles(req, res) {
    const { companyId } = req.params
    try {
      const company_files = await prisma.company_files.findMany({
        where: {
          companyId: parseInt(companyId),
        },
      })
      res.status(200).json(company_files)
    } catch (error) {
      res.status(500).json(prismaErrorHandling(error))
      console.error(error)
    }
  }

  // get company file by id
  static async getCompanyFileById(req, res) {
    const { id } = req.params
    try {
      const company_file = await prisma.company_files.findUnique({
        where: {
          id: parseInt(id),
        },
      })
      res.status(200).json(company_file)
    } catch (error) {
      res.status(500).json(prismaErrorHandling(error))
      console.error(error)
    }
  }

  // delete company file by id
  static async deleteCompanyFile(req, res) {
    const { id } = req.params
    try {
      const company_file = await prisma.company_files.findUnique({
        where: {
          id: parseInt(id),
        },
      })

      fs.unlinkSync(company_file.file_path)

      await prisma.company_files.delete({
        where: {
          id: parseInt(id),
        },
      })
      res.status(204).end()
    } catch (error) {
      res.status(500).json(prismaErrorHandling(error))
      console.error(error)
    }
  }
}
