import Files from '../controllers/files.controller.js'

const fileRoutes = (app) => {
  // app.get("/api/files", Files.GetFiles);
  // app.get("/api/files/:id", Files.FindFileById);
  // app.post("/api/files", Files.CreateFile);
  // app.put("/api/files/:id", Files.UpdateFile);
  // app.delete("/api/files/:id", Files.DeleteFile);

  app.post('/api/files', Files.UploadFile)
}

export default fileRoutes
