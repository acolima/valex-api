import * as businessRepository from "../repositories/businessRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as cardVerification from "../utils/cardVerificationUtils.js"
import * as establishmentVerification from "../utils/establishmentVerificationUtils.js"

import { getBalance, getOriginalCardId } from "./cardService.js"
import { Card } from "../repositories/cardRepository.js"

export async function newPayment(
  cardId: number, password: string, establishmentId: number, amount: number
){
  const card = await cardRepository.findById(cardId)
  cardVerifications(card, password, null)

  await establishmentVerifications(establishmentId, card)

  await checkBalance(cardId, amount)

  await paymentRepository.insert({cardId, businessId: establishmentId, amount})
}

export async function newOnlinePayment(
  cardNumber: string, cardHolderName: string,
  expirationDate: string, securityCode: string,
  establishmentId: number, amount: number
){
  const card = await cardRepository
    .findByCardDetails(cardNumber, cardHolderName, expirationDate)
  cardVerifications(card, null, securityCode)
  
  let cardId = card.id

  if(card.isVirtual) cardId = await getOriginalCardId(card.originalCardId)

  await establishmentVerifications(establishmentId, card)

  await checkBalance(card.id, amount)

  await paymentRepository.insert({cardId, businessId: establishmentId, amount})
}

function cardVerifications(card: Card, password: string, securityCode: string){
  cardVerification.unregisteredCard(card)
  cardVerification.expiredCard(card)
  cardVerification.deactivatedCard(card)
  cardVerification.blockedCard(card)

  if(password){
    cardVerification.checkPassword(card, password)
    cardVerification.isNotVirtualCard(card, "Virtual cards aren't accepted in POS")
  }
  else 
    cardVerification.checkSecurityCode(card, securityCode)
}

async function establishmentVerifications(establishmentId: number, card: Card){
  const establishment = await businessRepository.findById(establishmentId)

  establishmentVerification.unregisteredEstablishment(establishment)

  establishmentVerification.differentCardType(card.type, establishment.type)
}

async function checkBalance(cardId: number, amount: number) {
  const { balance } = await getBalance(cardId)
  
  cardVerification.insuficientBalance(balance, amount)
}