import { Request, Response } from "express"
import * as cardService from "../services/cardService.js"

export async function createCard(req: Request, res: Response){
  const {employeeId, type} = req.body
  
  await cardService.createCard(employeeId, type)

  res.sendStatus(201)
}