import * as error from "../utils/errorUtils.js"
import dayjs from "dayjs"
import { Card } from "../repositories/cardRepository.js"

export function unregisteredCard(card: Card){
  if(!card) throw error.unregisteredCard()
}

export function expiredCard(card: Card){
  if(card.expirationDate < dayjs().format('MM/YY'))
    throw error.expiredCard()
}

export function activatedCard(card: Card){
  if(card.password) throw error.activatedCard()
}

export function deactivatedCard(card: Card){
  if(!card.password) throw error.deactivatedCard()
}
