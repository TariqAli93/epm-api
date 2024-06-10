import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'

const prisma = prismaInstance

export default class Projects {
  static async CreateProject(req, res) {
    if (!req.body) {
      return res.status(400).json({
        message: 'No data provided',
      })
    }

    const body_object = {
      project_name: req.body.project_name,
      project_company: req.body.project_company,
      project_amount: req.body.project_amount,
      project_start_date: req.body.project_start_date,
      project_end_date: req.body.project_end_date,
      project_progress: req.body.project_progress,
      project_status: req.body.project_status,
      project_stops: req.body.project_stops,
      sections: {
        create: [
          {
            section_name: 'التخطيط',
            path: '/planning',
            icon: 'timeline',
          },
          {
            section_name: 'الحسابات',
            path: '/accountent',
            icon: 'account_balance',
          },
          {
            section_name: 'العقود',
            path: '/contracts',
            icon: 'description',
          },
          {
            section_name: 'الهندسة',
            path: '/engineering',
            icon: 'engineering',
          },
          {
            section_name: 'القانونية',
            path: '/legal',
            icon: 'gavel',
          },
          {
            section_name: 'المكتبة',
            path: '/library',
            icon: 'library_books',
          },
        ],
      },
    }

    try {
      const new_project = await prisma.projects.create({
        data: body_object,
      })
      res.status(201).json(new_project)
    } catch (err) {
      res.status(500).send(prismaErrorHandling(err))
      console.error(err)
    }
  }

  static async UpdateProject(req, res) {
    if (!req.body) {
      return res.status(400).json({
        message: 'No data provided',
      })
    }

    try {
      const updated_project = await prisma.projects.update({
        where: { project_id: parseInt(req.params.id) },
        data: req.body,
      })

      res.status(200).json(updated_project)
    } catch (error) {
      res.status(500).send(prismaErrorHandling(error))
      console.error(error)
    }
  }

  static async GetProjects(req, res) {
    try {
      const all_projects = await prisma.projects.findMany({
        include: {
          sections: {
            include: {
              files: true,
            },
          },
          guarantee: {
            include: {
              guarantee_file: true,
            },
          },
          insurance: {
            include: {
              insurance_file: true,
            },
          },
          maintenance: {
            include: {
              maintenance_file: true,
            },
          },
        },
      })

      res.status(200).json(all_projects)
    } catch (err) {
      res.status(500).send(prismaErrorHandling(err))
      console.error(err)
    }
  }

  static async FindProjectById(req, res) {
    try {
      const { id } = req.params
      const project = await prisma.projects.findFirst({
        where: { project_id: parseInt(id) },
        include: {
          sections: true,
          guarantee: true,
          insurance: true,
          maintenance: true,
        },
      })
      res.status(200).json(project)
      console.log(project)
    } catch (err) {
      res.status(500).send(prismaErrorHandling(err))
      console.error(err)
    }
  }

  static async DeleteProject(req, res) {
    try {
      const deleted_project = await prisma.projects.delete({
        where: { project_id: parseInt(req.params.id) },
      })
      res.status(200).json(deleted_project)
    } catch (err) {
      res.status(500).send(prismaErrorHandling(err))
      console.error(err)
    }
  }

  static async DeleteAllProjects(req, res) {
    try {
      const deleted_projects = await prisma.projects.deleteMany()
      res.status(200).json(deleted_projects)
    } catch (err) {
      res.status(500).send(prismaErrorHandling(err))
      console.error(err)
    }
  }

  static async changeProjectStatus(req, res) {
    try {
      const { id } = req.params
      const project = await prisma.projects.update({
        where: { project_id: parseInt(id) },
        data: {
          project_status: req.body.project_status,
        },
      })
      res.status(200).json(project)
    } catch (err) {
      res.status(500).send(prismaErrorHandling(err))
      console.error(err)
    }
  }
}
