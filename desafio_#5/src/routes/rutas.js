const { Router } = require('express');
const { ProductsController } = require('../controller/productos');

const router = Router();

router.get('/productos', (req, res) => {
    res.render('form');
})

router.get('/', (req, res) => {
    const data = ProductsController.getAll();
    res.render('productos', { data })
})

router.post('/productos', (req, res) => {
    const body = req.body;
    const nuevoProducto = {
        titulo: body.titulo,
        precio: body.precio,
        imagen: body.imagen,
    }
    try {
        ProductsController.save(nuevoProducto);
        res.render('form')
    } catch (error) {
        console.log(error);
    }
})


module.exports = router