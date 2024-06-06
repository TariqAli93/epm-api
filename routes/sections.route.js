import Sections from '../controllers/sections.controller.js'

const sectionsRoutes = (app) => {
  app.get('/api/sections', Sections.getSections)
  app.get('/api/sections/:id', Sections.getSection)
}

export default sectionsRoutes
