import { Router } from 'express';
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js';
import * as paymentSchemas from '../schemas/paymentSchema.js';
import * as paymentController from '../controllers/paymentController.js';

const paymentRouter = Router();

paymentRouter.post(
	'/online',
	schemaValidation(paymentSchemas.onlinePayment),
	paymentController.newOnlinePayment
);

paymentRouter.post(
	'/:id',
	schemaValidation(paymentSchemas.payment),
	paymentController.newPayment
);

export default paymentRouter;
