import * as companyRepository from "../repositories/companyRepository.js"
import * as error from "../utils/errorUtils.js"

export async function findCompany(apiKey: string){
  const validCompanyKey = await companyRepository.findByApiKey(apiKey)
  if(!validCompanyKey) throw error.unauthorized("Invalid API key")
}