const express = require('express');
const ProductsController = require('../controller/productos');


const router = express.Router();

router.post('/', (req, res) => {

    /* const nuevoProducto = {
        titulo: body.titulo,
        precio: body.precio,
        imagen: body.imagen,
    }; */
    try {
        const body = req.body;
        ProductsController.save(body);
        return res.status(200).json({ msg: "Se agrego el producto" });
    } catch (err) {
        console.log(err);
    };
})

module.exports = router;