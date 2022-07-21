import * as cardController from '../controllers/cardController.js';
import * as cardSchemas from '../schemas/cardSchema.js';

import { Router } from 'express';
import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js';

const cardRouter = Router();

cardRouter.post(
	'/create',
	schemaValidation(cardSchemas.createCard),
	cardController.createCard
);

cardRouter.post(
	'/create/virtual',
	schemaValidation(cardSchemas.createVirtualCard),
	cardController.createVirtualCard
);

cardRouter.put(
	'/:id/activate',
	schemaValidation(cardSchemas.activateCard),
	cardController.activateCard
);

cardRouter.get('/:id/balance', cardController.getBalance);

cardRouter.put('/:id/block', cardController.updateCardStatus);

cardRouter.put('/:id/unblock', cardController.updateCardStatus);

cardRouter.delete(
	'/:id/deleteCard',
	schemaValidation(cardSchemas.deleteVirtualCard),
	cardController.deleteVirtualCard
);

export default cardRouter;
