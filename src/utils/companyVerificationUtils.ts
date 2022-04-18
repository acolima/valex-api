import { Company } from "../repositories/companyRepository"
import * as error from "../utils/errorUtils.js"

export function invalidApiKey(company: Company){
  if(!company) throw error.unauthorized("Invalid API key")
}