import { Router } from 'express';
import cardRouter from '../routes/cardRouter.js';
import paymentRouter from './paymentRouter.js';
import rechargeRouter from './rechargeRouter.js';

const router = Router();

router.use('/cards', cardRouter);
router.use('/payment', paymentRouter);
router.use('/recharge', rechargeRouter);

export default router;
