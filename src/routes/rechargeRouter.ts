import { Router } from "express"
import apiKeyValidation from "../middlewares/apiKeyValidationMiddleware.js"
import { schemaValidation } from "../middlewares/schemaValidationMiddleware.js"
import * as rechargeSchemas from "../schemas/rechargeSchema.js"
import * as rechargeController from "../controllers/rechargeController.js"

const rechargeRouter = Router()

rechargeRouter.post(
  "/recharge/:id",
  apiKeyValidation,
  schemaValidation(rechargeSchemas.recharge), 
  rechargeController.rechargeCard
)

export default rechargeRouter