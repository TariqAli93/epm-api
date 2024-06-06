import Guarantee from '../controllers/guarantee.controller.js'

const guaranteeRoutes = (app) => {
  app.post('/api/guarantee', Guarantee.CreateGuarantee)
  app.put('/api/guarantee/:id', Guarantee.UpdateGuarantee)
}

export default guaranteeRoutes
