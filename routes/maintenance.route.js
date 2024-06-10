import Maintenance from '../controllers/maintenance.controller.js'

const maintenanceRoutes = (app) => {
  app.post('/api/maintenance', Maintenance.CreateMaintenance)
  app.put('/api/maintenance/:id', Maintenance.UpdateMaintenance)
  app.delete('/api/maintenance/:id', Maintenance.DeleteMaintenance)
}

export default maintenanceRoutes
