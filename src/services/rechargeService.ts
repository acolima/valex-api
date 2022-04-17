import * as cardRepository from "../repositories/cardRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as cardVerification from "../utils/cardVerificationUtils.js"

export async function rechargeCard(id: number, amount: number) {
  const card = await cardRepository.findById(id)
  
  cardVerification.unregisteredCard(card)
  cardVerification.expiredCard(card)
  cardVerification.deactivatedCard(card)

  const recharge = {
    cardId: Number(id),
    amount
  }

  await rechargeRepository.insert(recharge)
}