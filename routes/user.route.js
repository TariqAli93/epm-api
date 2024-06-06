import User from "../controllers/user.controller.js";

const userRoutes = (app) => {
  app.post("/api/login", User.LoginUserAccount);
  app.post("/api/user", User.CreateUserAccount);
};

export default userRoutes;