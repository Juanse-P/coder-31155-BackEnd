import { Router } from 'express';
import {
  getAll,
  getProductById,
  save,
  updateProduct,
  deleteProduct
} from '../controllers/product.js';

const router = Router();

router.get('/', getAll);

router.get('/:id', getProductById);

router.post('/', save);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;