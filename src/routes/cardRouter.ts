import * as cardController from "../controllers/cardController.js"
import * as paymentController from "../controllers/paymentController.js"

import * as cardSchemas from "../schemas/cardSchema.js"
import * as rechargeSchemas from "../schemas/rechargeSchema.js"
import * as paymentSchemas from "../schemas/paymentSchema.js"

import { Router } from "express"
import apiKeyValidation from "../middlewares/apiKeyValidationMiddleware.js"
import { schemaValidation } from "../middlewares/schemaValidationMiddleware.js"

const cardRouter = Router()

cardRouter.post(
  "/cards/create", 
  apiKeyValidation, 
  schemaValidation(cardSchemas.createCard), 
  cardController.createCard
)
cardRouter.post(
  "/cards/:id/activate", 
  schemaValidation(cardSchemas.activateCard), 
  cardController.activateCard
)
cardRouter.post(
  "/cards/:id/recharge",
  apiKeyValidation,
  schemaValidation(rechargeSchemas.recharge), 
  cardController.rechargeCard
)
cardRouter.post(
  "/cards/:id/payment",
  schemaValidation(paymentSchemas.payment),
  paymentController.newPayment
)

export default cardRouter