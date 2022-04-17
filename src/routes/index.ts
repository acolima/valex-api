import { Router } from "express"
import cardRouter from "../routes/cardRouter.js"
import paymentRouter from "./paymentRouter.js"
import rechargeRouter from "./rechargeRouter.js"

const router = Router()

router.use(cardRouter)
router.use(paymentRouter)
router.use(rechargeRouter)

export default router