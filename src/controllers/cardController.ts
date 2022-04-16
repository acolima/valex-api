import { Request, Response } from "express"
import * as cardService from "../services/cardService.js"

export async function createCard(req: Request, res: Response){
  const { employeeId, type } = req.body
  
  const cvv = await cardService.createCard(employeeId, type)

  res.status(201).send(cvv)
}

export async function activateCard(req: Request, res: Response){
  const { id } = req.params

  const {securityCode, password} = req.body

  await cardService.activateCard(Number(id), securityCode, password)

  res.sendStatus(200)
}

export async function rechargeCard(req: Request, res: Response) {
  const { id } = req.params

  const { amount } = req.body

  await cardService.rechargeCard(Number(id), amount)

  res.sendStatus(200)
}