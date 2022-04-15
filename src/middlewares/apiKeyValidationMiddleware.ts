import { Request, Response, NextFunction } from "express"
import * as companyService from "../services/companyService.js"
import * as error from "../utils/errorUtils.js"

export default async function apiKeyValidation(
  req: Request, res: Response, next: NextFunction
){
  const key = req.headers['x-api-key']
  const apiKey = key as string

  if(!apiKey) throw error.invalidKey()

  await companyService.findCompany(apiKey)

  next()
}