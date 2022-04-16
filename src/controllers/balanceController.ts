import * as balanceService from "../services/balanceService.js"

import { Request, Response } from "express"

export async function getBalance(req: Request, res: Response) {
  const { id } = req.params

  const metrics = await balanceService.getBalance(Number(id))

  res.send(metrics)
}