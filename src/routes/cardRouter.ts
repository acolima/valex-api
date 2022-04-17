import * as cardController from "../controllers/cardController.js"
import * as cardSchemas from "../schemas/cardSchema.js"

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
cardRouter.put(
  "/cards/:id/activate", 
  schemaValidation(cardSchemas.activateCard), 
  cardController.activateCard
)
cardRouter.get(
  "/cards/:id/balance",
  cardController.getBalance
)
cardRouter.put(
  "/cards/:id/block",
  cardController.updateCardStatus
)
cardRouter.put(
  "/cards/:id/unblock",
  cardController.updateCardStatus
)

export default cardRouter