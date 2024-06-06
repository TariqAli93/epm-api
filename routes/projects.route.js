import Projects from '../controllers/projects.controller.js'

const projectRoutes = (app) => {
  app.get('/api/projects', Projects.GetProjects)
  app.get('/api/projects/:id', Projects.FindProjectById)
  app.post('/api/projects', Projects.CreateProject)
  app.put('/api/projects/:id', Projects.UpdateProject)
  app.delete('/api/projects/:id', Projects.DeleteProject)
}

export default projectRoutes
