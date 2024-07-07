import Installment from '../controllers/installments.controller.js'

const installmentsRoutes = (app) => {
  app.post('/api/installments', Installment.CreateInstallment)
  app.get('/api/projects/installments/:id', Installment.GetProjectInstallments)
  app.get('/api/installments', Installment.GetInstallment)
  app.put('/api/installments/:id', Installment.UpdateInstallment)
  app.delete('/api/installments/:id', Installment.DeleteInstallment)
}

export default installmentsRoutes
