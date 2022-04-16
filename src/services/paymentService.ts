import * as businessRepository from "../repositories/businessRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as balanceService from "../services/balanceService.js"
import * as cardVerification from "../utils/cardVerificationUtils.js"
import * as error from "../utils/errorUtils.js"

export async function newPayment(
  cardId: number, password: string, businessId: number, amount: number
){
  const card = await cardRepository.findById(cardId)

  cardVerification.unregisteredCard(card)
  cardVerification.expiredCard(card)
  cardVerification.deactivatedCard(card)

  cardVerification.checkPassword(card, password)

  const establishment = await businessRepository.findById(businessId)
  if(!establishment) throw error.unregisteredEstablishment()

  if(card.type !== establishment.type)
    throw error.differentCardType()

  const { balance } = await balanceService.getBalance(cardId)
  if(balance <= amount) throw error.insuficientBalance()

  await paymentRepository.insert({cardId, businessId, amount})
}