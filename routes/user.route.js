import User from '../controllers/user.controller.js'

const userRoutes = (app) => {
  app.post('/api/login', User.LoginUserAccount)
  app.post('/api/users', User.CreateUserAccount)
  app.get('/api/users', User.GetUsers)
  app.get('/api/users/:id', User.GetUsersById)
  app.put('/api/users/:id', User.UpdateUser)
  app.delete('/api/users/:id', User.DeleteUser)
}

export default userRoutes
