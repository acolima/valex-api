import { Request, Response } from "express"

import * as rechargeService from "../services/rechargeService.js"
import * as companyService from "../services/companyService.js"
import * as error from "../utils/errorUtils.js"

export async function rechargeCard(req: Request, res: Response) {
  const key = req.headers['x-api-key']
  const apiKey = key as string
  
  if(!apiKey) throw error.unauthorized("Invalid API key")

  const company = await companyService.findCompany(apiKey)

  const { id } = req.params

  const { amount } = req.body


  await rechargeService.rechargeCard(Number(id), amount)

  res.sendStatus(200)
}