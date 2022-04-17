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

export async function updateCardStatus(req: Request, res: Response){
  const { id } = req.params
  const { password } = req.body
  
  let blockCard: boolean = false
  if(req.path === `/cards/${id}/block`)
    blockCard = true

  await cardService.updateCardStatus(Number(id), password, blockCard)

  res.sendStatus(200)
}

export async function getBalance(req: Request, res: Response) {
  const { id } = req.params

  const metrics = await cardService.getBalance(Number(id))

  res.send(metrics)
}