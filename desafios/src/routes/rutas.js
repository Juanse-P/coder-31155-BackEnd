const asyncHandler = require('express-async-handler')
const { Router } = require('express');
const { ProductsController } = require('../controller/productos');

const router = Router();

router.get('/', (req, res) =>{
    res.json({
        msg: ProductsController.getAll()
    })
})

router.get('/:id', (req,res) =>{
    const id = req.params.id;

    const product = ProductsController.getById(id)
    res.json({
        msg: product
    })
})

router.post('/', async (req, res, next) =>{
    const { body } = req

    try{
        const datos = await ProductsController.save(body);
        res.json({
            msg: datos
        })
    }catch (err) {
        next(err);
    }
})

const funcionAsync = async (req,res) =>{
    const id = req.params.id;
    const { body } = req

    const datos = await ProductsController.updateById(id, body);
    res.json({
        msg: datos
    })
}
router.put('/:id', asyncHandler(funcionAsync));

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    res.json({
        msg: ProductsController.deleteById(id)
    })
})

module.exports = router;


/* --------------------------------------------------------------------------------------------------- */


/* const express = require('express');


const { Router } = require('express');
const Producto = require('../productosClass')

const productosArray = [
    new Producto(1, 'Escuadra', 123.45, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'),
    new Producto(2, 'Calculadora', 234.56, 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'),
    new Producto(3, 'Globo Terráqueo', 345.67, 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'),
]

const productoTrabajado = new Producto();

const router = Router();

router.get('/', (req, res) => {
    return res.json({
        productosArray,
    });
});

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
        const produ = productoTrabajado.getById(id, productosArray);
        return res.status(201).json({
            produ,
        });

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
})

router.post('/', (req, res) => {
    try {
        const objeObtenido = req.body;

        const produ = productoTrabajado.saveProdu(objeObtenido, productosArray);

        return res.status(201).json({
            produ,
        })

    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
})

router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const produ = req.body;

        productoTrabajado.actualizarProducto(id, produ, productosArray)

        return res.status(200).json({
            produ,
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        productoTrabajado.deleteById(id, productosArray);
        return res.status(200).json({
            productosArray,
        });
    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }
});

module.exports = router;

/* rutaProductos.get('/', (req, res) => {
    const muestraProdu = productos.getAll();
    res.send(muestraProdu);
})

rutaProductos.get(':id', (req, res) => {
    const id = req.params.id;

    const producto = productos.getById(id);
    if (producto) {
        res.send(producto)
    } else {
        res.status(404).send({ error: 'El producto con el id introducido no existe, pruba con otro id!' })
    }
})

rutaProductos.post('/', (req, res) => {
    const data = req.body;
    console.log(req.body);

    const { title, price, thumbnail } = req.body;

    if (!title || !price || !thumbnail) {
        return res.status(400).json({
            msg: 'Parece que los datos de los campos son invalidos'
        })
    } else {
        const nuevoProdu = {
            title,
            price,
            thumbnail
        }

        productos.save(nuevoProdu);
        res.json({
            msg: "Se ha añadido el producto con los siguientes atributos:",
            data: nuevoProdu
        })
    }
})

rutaProductos.put('/:id', (req, res) => {
    const id = req.params.id;

    const { title, price, thumbnail } = req.body;

    const buscaProdu = productos.getById(id);

    if (buscaProdu) {
        productos.deleteById(id)
        const productoEditado = {
            id: id,
            title,
            price,
            thumbnail
        }
        productos.save(productoEditado)
        res.json({
            msj: `Se modifico el objeto con el id: ${id}`,
            data: productoEditado
        })
    } else {
        res.status(404).send({ error: 'El producto con el id introducido no existe, pruba con otro id!' })
    }
})

rutaProductos.delete('/:id', (req, res) => {
    const id = req.params.id;

    productos.deleteById(id);

    res.json({
        msj: `se ha eliminado el producto con el id: ${id}`
    })
});

module.exports = rutaProductos; */ 