const { Router } = require('express');
const productosRouter = require('./rutas');

const router = Router();

router.get('/', (req, res) =>{
    res.json({
        msg: ' funciona el router'
    })
})

router.use('/productos', productosRouter);

module.exports = router;