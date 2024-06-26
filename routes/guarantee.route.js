import Guarantee from '../controllers/guarantee.controller.js'

const guaranteeRoutes = (app) => {
  app.post('/api/guarantee', Guarantee.CreateGuarantee)
  app.put('/api/guarantee/:id', Guarantee.UpdateGuarantee)
  app.delete('/api/guarantee/:id', Guarantee.DeleteGuarantee)
}

export default guaranteeRoutes
