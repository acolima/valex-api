import { Router } from "express"
import { schemaValidation } from "../middlewares/schemaValidationMiddleware.js"
import * as paymentSchemas from "../schemas/paymentSchema.js"
import * as paymentController from "../controllers/paymentController.js"

const paymentRouter = Router()

paymentRouter.post(
  "/payment/:id",
  schemaValidation(paymentSchemas.payment),
  paymentController.newPayment
)
export default paymentRouter