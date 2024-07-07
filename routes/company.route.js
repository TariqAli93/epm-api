import company from '../controllers/company.controller.js'

const companyRoutes = (app) => {
  app.post('/api/company', company.createCompany)
  app.get('/api/company', company.getCompanies)
  app.get('/api/company/:id', company.getCompanyById)
  app.put('/api/company/:id', company.updateCompany)
  app.delete('/api/company/:id', company.deleteCompany)

  app.post('/api/company/files', company.createCompanyFile)
  app.get('/api/company/files', company.getCompanyFiles)
  app.get('/api/company/files/:id', company.getCompanyFileById)
  app.delete('/api/company/files/:id', company.deleteCompanyFile)
}

export default companyRoutes
