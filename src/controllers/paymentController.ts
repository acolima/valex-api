import { Request, Response } from "express"
import * as paymentService from "../services/paymentService.js"

export async function newPayment(req: Request, res: Response) {
  const { id } = req.params

  const { password, businessId, amount } = req.body

  await paymentService.newPayment(Number(id), password, businessId, amount)

  res.sendStatus(200)
}