import { Router } from 'express';
import {
    addCart,
    deleteCart,
    getProducts,
    addProduct,
    deleteProduct
} from '../controllers/cart.js';

const router = Router();

router.post('/', addCart);

router.delete('/:id', deleteCart);

router.get('/:id/productos', getProducts);

router.post('/:id/productos', addProduct);

router.delete('/:id/productos/:id_prod', deleteProduct);

export default router;