import { Router } from "express"
import cardRouter from "../routes/cardRouter.js"

const router = Router()

router.use(cardRouter)

export default router