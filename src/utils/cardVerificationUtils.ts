import * as error from "../utils/errorUtils.js"
import dayjs from "dayjs"
import bcrypt from "bcrypt"
import { Card } from "../repositories/cardRepository.js"

export function unregisteredCard(card: Card){
  if(!card) throw error.notFound("Card not registered")
}

export function expiredCard(card: Card){
  if(card.expirationDate < dayjs().format('MM/YY'))
    throw error.unauthorized("Expired card")
}

export function activatedCard(card: Card){
  if(card.password) throw error.unauthorized("Card is already active")
}

export function deactivatedCard(card: Card){
  if(!card.password) throw error.unauthorized("Card is not active")
}

export function blockedCard(card: Card){
  if(card.isBlocked) throw error.unauthorized("This card is blocked")
}

export function unblockedCard(card: Card){
  if(!card.isBlocked) throw error.unauthorized("This card is not blocked" )
}

export function checkPassword(card: Card, password: string) {
  if(!bcrypt.compareSync(password, card.password)) 
    throw error.unauthorized("Password is incorrect")
}

export function checkSecurityCode(card: Card, securityCode: string){
  if(!bcrypt.compareSync(securityCode, card.securityCode))
    throw error.unauthorized("Invalid security code")
}

export function isVirtualCard(card: Card) {
  if(!card.isVirtual) 
    throw error.unauthorized("Only virtual cards can be deleted")
}

export function isNotVirtualCard(card: Card, message: string) {
  if(card.isVirtual) 
    throw error.unauthorized(message)
}

export function duplicatedCardType(card: Card, type: string){
  if(card) throw error.conflict(`This user already has a ${type} card` )
}

export function cardNumberInUse(card: Card){
  if(card) throw error.conflict("This number is already in use")
}

export function insuficientBalance(balance: number, amount: number) {
  if(balance <= amount) throw error.unauthorized("Insuficient balance")
}