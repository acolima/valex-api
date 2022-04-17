import { Request, Response } from "express"

import * as rechargeService from "../services/rechargeService.js"

export async function rechargeCard(req: Request, res: Response) {
  const { id } = req.params

  const { amount } = req.body

  await rechargeService.rechargeCard(Number(id), amount)

  res.sendStatus(200)
}