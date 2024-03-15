import { Router } from 'express';
import * as authControler from '../controllers/auth.controllers';

const router = Router();

router.post('/signup', authControler.signup);
router.post('/login', authControler.login);
router.post('/admin/signup', authControler.adminSignup);
router.post('/admin/login', authControler.adminLogin);
router.post('/forgot-password', authControler.forgotPassword);
router.post('/reset-password', authControler.resetPassword);







export default router;
