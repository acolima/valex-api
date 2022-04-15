import { Request, Response } from "express"
import * as cardService from "../services/cardService.js"

export async function createCard(req: Request, res: Response){
  const { employeeId, type } = req.body
  
  await cardService.createCard(employeeId, type)

  res.sendStatus(201)
}

export async function activateCard(req: Request, res: Response){
  const { id } = req.params

  const {securityCode, password} = req.body

  await cardService.activateCard(Number(id), securityCode, password)

  res.sendStatus(200)
}