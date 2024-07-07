import {
  prismaErrorHandling,
  prismaInstance,
} from '../middlewares/handleError.middleware.js'
import moment from 'moment'

const prisma = prismaInstance

export default class Projects {
  static async CreateProject(req, res) {
    if (!req.body) {
      return res.status(400).json({
        message: 'No data provided',
      })
    }

    try {
      const project_body = {
        project_name: req.body.project_name,
        project_company: req.body.project_company,
        project_amount: parseFloat(req.body.project_amount),
        project_start_date: req.body.project_start_date,
        project_end_date: req.body.project_end_date,
        project_progress: req.body.project_progress,
        project_status: req.body.project_status,
        project_stops: req.body.project_stops,
        project_days: parseInt(req.body.project_days),
      }
      console.log(project_body)
      const new_project = await prisma.projects.create({
        data: {
          ...project_body,
          createdBy: {
            connect: {
              user_id: req.body.user_id,
            },
          },
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
        },
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
      const oldProject = await prisma.projects.findFirst({
        where: { project_id: parseInt(req.params.id) },
      })

      const diffProjDays = (start, end) => {
        let startDate = moment(start)
        let endDate = moment(end)
        // check if the end date is undefined
        if (start === undefined && end !== undefined) {
          // if the start date is undefined and the end date is not get oldProject start date and end date and calculate the duration
          startDate = moment(oldProject.project_start_date)
          endDate = moment(req.body.project_end_date)
        } else if (start !== undefined && end === undefined) {
          // if the end date is undefined and the start date is not get oldProject start date and end date and calculate the duration
          startDate = moment(req.body.project_start_date)
          endDate = moment(oldProject.project_end_date)
        } else if (start === undefined && end === undefined) {
          // if both dates are undefined get oldProject start date and end date and calculate the duration
          startDate = moment(oldProject.project_start_date)
          endDate = moment(oldProject.project_end_date)
        }

        const duration = moment.duration(endDate.diff(startDate)).asDays()

        return Math.floor(duration)
      }

      const project_days = diffProjDays(
        req.body.project_start_date,
        req.body.project_end_date,
      )

      const updated_project = await prisma.projects.update({
        where: { project_id: parseInt(req.params.id) },
        data: {
          ...req.body,
          project_days: project_days,
        },
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
          createdBy: {
            select: {
              user_id: true,
              user_name: true,
            },
          },
          installments: true,
          project_change_orders: true,
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

  static async projectChangeOrder(req, res) {
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        const oldProject = await tx.projects.findFirst({
          where: { project_id: parseInt(req.params.id) },
        })

        const changeOrder = await tx.project_change_orders.create({
          data: {
            change_order_cost: req.body.change_order_cost,
            change_order_date: req.body.change_order_date,
            change_order_value: req.body.change_order_value,
            project: {
              connect: {
                project_id: parseInt(req.params.id),
              },
            },
          },
        })

        // check if the change order value to edit the project end date
        if (changeOrder.change_order_value !== 0) {
          const project_end_date = moment(oldProject.project_end_date).add(
            changeOrder.change_order_value,
            'days',
          )

          await tx.projects.update({
            where: { project_id: parseInt(req.params.id) },
            data: {
              project_end_date: project_end_date,
            },
          })
        }

        await tx.projects.update({
          where: { project_id: parseInt(req.params.id) },
          data: {
            project_amount:
              changeOrder.change_order_cost === 0
                ? oldProject.project_amount
                : oldProject.project_amount + changeOrder.change_order_cost,
            project_days:
              changeOrder.change_order_value === 0
                ? oldProject.project_days
                : oldProject.project_days + changeOrder.change_order_value,
          },
        })
      })

      res.status(200).json(transaction)
    } catch (err) {
      res.status(500).send(prismaErrorHandling(err))
      console.error(err)
    }
  }

  static async GetProjectChangeOrder(req, res) {
    try {
      const { id } = req.params
      const orders = await prisma.project_change_orders.findMany({
        where: { projectId: parseInt(id) },
        include: {
          project: {
            select: {
              project_name: true,
              project_id: true,
            },
          },
        },
      })
      res.status(200).json(orders)
    } catch (err) {
      res.status(500).send(prismaErrorHandling(err))
      console.error(err)
    }
  }

  // delete project change order and project end date and project amount and project days after the change order
  static async deleteProjectChangeOrder(req, res) {
    try {
      const { id } = req.params
      const transaction = await prisma.$transaction(async (tx) => {
        const changeOrder = await tx.project_change_orders.findFirst({
          where: { change_order_id: parseInt(id) },
        })

        const oldProject = await tx.projects.findFirst({
          where: { project_id: changeOrder.projectId },
        })

        const project_end_date = moment(oldProject.project_end_date).subtract(
          changeOrder.change_order_value,
          'days',
        )

        await tx.projects.update({
          where: { project_id: changeOrder.projectId },
          data: {
            project_end_date: project_end_date,
            project_amount:
              oldProject.project_amount - changeOrder.change_order_cost,
            project_days:
              oldProject.project_days - changeOrder.change_order_value,
          },
        })

        await tx.project_change_orders.delete({
          where: { change_order_id: parseInt(id) },
        })
      })

      res.status(200).json(transaction)
    } catch (err) {
      res.status(500).send(prismaErrorHandling(err))
      console.error(err)
    }
  }
}
