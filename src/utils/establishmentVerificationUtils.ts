import { Business } from "../repositories/businessRepository.js"
import * as error from "../utils/errorUtils.js"

export function unregisteredEstablishment(establishment: Business){
  if(!establishment) throw error.unauthorized("Establishment is not registered")
}

export function differentCardType(cardType: string, establishmentType: string){
  if(cardType !== establishmentType)
    throw error.unauthorized("Different card type")
}