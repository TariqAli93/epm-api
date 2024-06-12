import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import projectRoutes from '../routes/projects.route.js'
import fileRoutes from '../routes/files.route.js'
import guaranteeRoutes from '../routes/guarantee.route.js'
import insuranceRoutes from '../routes/insurance.route.js'
import maintenanceRoutes from '../routes/maintenance.route.js'
import userRoutes from '../routes/user.route.js'
import sectionsRoutes from '../routes/sections.route.js'
import translateErrors from '../middlewares/translateErrors.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: true }))
app.use(morgan('dev'))
app.use(translateErrors)
app.use(express.static('uploads'))

app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename
  const imagePath = path.join(__dirname, 'uploads', filename)

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(404).send('Image not found')
    } else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' }) // أو نوع المحتوى المناسب
      res.end(data)
    }
  })
})

projectRoutes(app)
fileRoutes(app)
guaranteeRoutes(app)
insuranceRoutes(app)
maintenanceRoutes(app)
userRoutes(app)
sectionsRoutes(app)

export default app
