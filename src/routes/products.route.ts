import { Router } from 'express';
import * as productController from '../controllers/products.controller';
import upload from '../middleware/multerConfig';

const router = Router();

router.post('/createProduct', productController.createProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProduct/:id', productController.getProductById);
router.post('/uploadCSV', upload.single('file'), productController.uploadCSV);
router.delete('/deleteAllProducts', productController.deleteAllProducts);


export default router;



