import { Router } from "express";
import productsRouter from './products.js';
import cartRouter from './cart.js'
;

const router = Router();

router.use('/productos', productsRouter);
router.use('/cart', cartRouter);

export default router;