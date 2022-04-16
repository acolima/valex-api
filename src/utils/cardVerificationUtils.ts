import * as error from "../utils/errorUtils.js"
import dayjs from "dayjs"
import { Card } from "../repositories/cardRepository.js"
import bcrypt from "bcrypt"

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

export function blockedCard(card: Card){
  if(card.isBlocked) throw error.blockedCard()
}

export function unblockedCard(card: Card){
  if(!card.isBlocked) throw error.unblockedCard()
}

export function checkPassword(card: Card, password: string) {
  if(!bcrypt.compareSync(password, card.password)) 
    throw error.incorrectPassword()
}