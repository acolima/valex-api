import * as cardController from "../controllers/cardController.js"
import { Router } from "express"
import apiKeyValidation from "../middlewares/apiKeyValidationMiddleware.js"
import { schemaValidation } from "../middlewares/schemaValidationMiddleware.js"
import cardSchema from "../schemas/cardSchema.js"

const cardRouter = Router()

cardRouter.post("/cards/create", apiKeyValidation, schemaValidation(cardSchema), cardController.createCard)

export default cardRouter