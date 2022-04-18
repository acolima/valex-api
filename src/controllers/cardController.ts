import { Request, Response } from "express"
import * as cardService from "../services/cardService.js"
import * as companyService from "../services/companyService.js"
import * as error from "../utils/errorUtils.js"

export async function createCard(req: Request, res: Response){
  const key = req.headers['x-api-key']
  const apiKey = key as string
  
  if(!apiKey) throw error.unauthorized("Invalid API key")

  const company = await companyService.findCompany(apiKey)

  const { employeeId, type } = req.body
  
  const card = await cardService.createCard(employeeId, type)

  res.status(201).send(card)
}

export async function createVirtualCard(req: Request, res: Response) {
  const { cardId, password } = req.body

  const card = await cardService.createVirtualCard(cardId, password)

  res.status(201).send(card)
}

export async function deleteVirtualCard(req: Request, res: Response) {
  const { id } = req.params
  
  const { password } = req.body

  await cardService.deleteVirtualCard(Number(id), password)

  res.sendStatus(200)
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