import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'

const prisma = prismaInstance

export default class Sections {
  static async getSections(req, res) {
    try {
      const sections = await prisma.sections.findMany({
        include: {
          files: true,
        },
      })
      res.status(200).json(sections)
    } catch (error) {
      prismaErrorHandling(error, res)
    }
  }

  static async getSection(req, res) {
    const { id } = req.params
    try {
      const section = await prisma.sections.findUnique({
        where: {
          section_id: parseInt(id),
        },
        include: {
          files: true,
        },
      })
      res.status(200).json(section)
    } catch (error) {
      prismaErrorHandling(error, res)
    }
  }
}
