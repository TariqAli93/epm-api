import Insurance from '../controllers/insurance.controller.js'

const insuranceRoutes = (app) => {
  app.post('/api/insurance', Insurance.CreateInsurance)
  app.put('/api/insurance/:id', Insurance.UpdateInsurance)
  app.delete('/api/insurance/:id', Insurance.DeleteInsurance)
}

export default insuranceRoutes
