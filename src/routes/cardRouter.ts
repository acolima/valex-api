import * as cardController from "../controllers/cardController.js"
import * as cardSchemas from "../schemas/cardSchema.js"

import { Router } from "express"
import { schemaValidation } from "../middlewares/schemaValidationMiddleware.js"

const cardRouter = Router()

cardRouter.post(
  "/cards/create", 
  schemaValidation(cardSchemas.createCard), 
  cardController.createCard
)
cardRouter.post(
  "/cards/create/virtual",
  schemaValidation(cardSchemas.createVirtualCard),
  cardController.createVirtualCard
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
cardRouter.delete(
  "/cards/:id/deleteCard",
  schemaValidation(cardSchemas.deleteVirtualCard),
  cardController.deleteVirtualCard
)
export default cardRouter