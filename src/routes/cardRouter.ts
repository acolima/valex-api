import * as cardController from "../controllers/cardController.js"
import { Router } from "express"
import apiKeyValidation from "../middlewares/apiKeyValidationMiddleware.js"
import { schemaValidation } from "../middlewares/schemaValidationMiddleware.js"
import * as cardSchemas from "../schemas/cardSchema.js"

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

export default cardRouter