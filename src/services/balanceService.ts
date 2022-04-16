import * as cardRepository from "../repositories/cardRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as cardVerification from "../utils/cardVerificationUtils.js"
import dayjs from "dayjs"

export async function getBalance(cardId: number) {
  const card = await cardRepository.findById(cardId)
  cardVerification.unregisteredCard(card)
  cardVerification.deactivatedCard(card)

  let transactions = await paymentRepository.findByCardId(cardId)
  let recharges = await rechargeRepository.findByCardId(cardId)

  const totalTransactions: number = getTotalAmount(transactions)
  const totalRecharges: number = getTotalAmount(recharges)
  
  transactions = listWithFormatedDate(transactions)
  recharges = listWithFormatedDate(recharges)

  return {
    balance: totalRecharges - totalTransactions,
    transactions, 
    recharges
  }
}

function getTotalAmount(list: any) {
  const totalAmount: number = list.reduce((sum: number, item: any) => 
    sum + item.amount, 0
  )
  return totalAmount
}

function listWithFormatedDate(list: any){
  const formatedList = list.map((item: any) => {
    let date = dayjs(item.timestamp).format("DD/MM/YY")
    
    delete item.timestamp
    return {
      ...item,
      timestamp: date
    }
  })

  return formatedList
}