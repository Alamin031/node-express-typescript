import { Router } from 'express';
import * as adminControler from '../controllers/admin.controller';
import * as productController from '../controllers/products.controller';
import upload from '../middleware/multerConfig';

const router = Router();

router.get('/getAllUsers', adminControler.getAllUsers);
router.get('/getUser/:id', adminControler.getUser);
router.get('/getAdminProfile', adminControler.getAdminProfile);
router.delete('/deleteUser/:id', adminControler.deleteUser);
router.put('/updateUser/:id', adminControler.updateUser);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.post('/uploadCSV', upload.single('file'), productController.uploadCSV);


export default router;
