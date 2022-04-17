import * as businessRepository from "../repositories/businessRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as cardVerification from "../utils/cardVerificationUtils.js"
import * as error from "../utils/errorUtils.js"

import { getBalance } from "./cardService.js"
import { Card } from "../repositories/cardRepository.js"

export async function newPayment(
  cardId: number, password: string, establishmentId: number, amount: number
){
  const card = await cardRepository.findById(cardId)
  cardVerifications(card, password, null)

  await establishmentVerification(establishmentId, card)

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

  await establishmentVerification(establishmentId, card)

  await checkBalance(card.id, amount)

  await paymentRepository.insert({cardId: card.id, businessId: establishmentId, amount})
}

function cardVerifications(card: Card, password: string, securityCode: string){
  cardVerification.unregisteredCard(card)
  cardVerification.expiredCard(card)
  cardVerification.deactivatedCard(card)
  cardVerification.blockedCard(card)

  password ?
    cardVerification.checkPassword(card, password) :
    cardVerification.checkSecurityCode(card, securityCode)
}

async function establishmentVerification(establishmentId: number, card: Card){
  const establishment = await businessRepository.findById(establishmentId)

  if(!establishment) throw error.unregisteredEstablishment()

  if(card.type !== establishment.type)
    throw error.differentCardType()
}

async function checkBalance(cardId: number, amount: number) {
  const { balance } = await getBalance(cardId)
  if(balance <= amount) throw error.insuficientBalance()
}