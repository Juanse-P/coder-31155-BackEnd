import express from "express";
import router from '../routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use((req, res, next) => {
    return res.status(404).json({
        error: '2, ruteo',
        descripcion: `ruta ${req.url} no implementada con el metodo seleccionado`,
    })
})

export default app;