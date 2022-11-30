import { initMongoDB } from "./db/database.js";
import express from "express";
import mainRouter from './routes/index.js'

const app = express();

app.use(express.json());

app.use('/api', mainRouter);

app.use((req, res) => {
    return res.status(404).json({
      error: -2,
      descripcion: `ruta ${req.url} no implementada`,
    });
  });

const init = async () => {
    await initMongoDB();
    const puerto = 8080;

    app.listen(puerto, () => console.log(`El server ya esta funcionando en el puerto ${puerto}`))
};

init();