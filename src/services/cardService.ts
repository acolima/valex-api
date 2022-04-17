import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as error from "../utils/errorUtils.js"
import * as cardVerification from "../utils/cardVerificationUtils.js"

import { TransactionTypes } from "../repositories/cardRepository.js"
import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import bcrypt from "bcrypt"

export async function createCard(employeeId: number, cardType: string){
  const employee = await employeeRepository.findById(employeeId)
  if(!employee) throw error.unregisteredEmployee()

  const type = cardType as TransactionTypes
  const duplicatedCardType = 
    await cardRepository.findByTypeAndEmployeeId(type, employeeId)
  if(duplicatedCardType) throw error.duplicatedCardType(type)

  const number = faker.finance.creditCardNumber('mastercard')
  
  const card = await cardRepository.findByNumber(number)
  if(card) throw error.cardNumberInUse()

  const cardholderName = formatName(employee.fullName)
  const expirationDate = dayjs().add(5, 'year').format("MM/YY")

  let securityCode = faker.finance.creditCardCVV()
  const cvv = securityCode
  securityCode = bcrypt.hashSync(securityCode, 10)

  const cardData = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type
  }

  await cardRepository.insert(cardData)

  const newCard = {
    cardNumber: number,
    cardholderName,
    securityCode: cvv,
    expirationDate
  }

  return {newCard}
}

export async function createVirtualCard(cardId: number, password: string) {
  const card = await cardRepository.findById(cardId)
  
  cardVerification.unregisteredCard(card)
  cardVerification.checkPassword(card, password)  

  const number = faker.finance.creditCardNumber('mastercard')
  
  const cardNumber = await cardRepository.findByNumber(number)
  if(cardNumber) throw error.cardNumberInUse()

  const expirationDate = dayjs().add(5, 'year').format("MM/YY")

  let securityCode = faker.finance.creditCardCVV()
  const cvv = securityCode
  securityCode = bcrypt.hashSync(securityCode, 10)

  const cardData = {
    employeeId: card.employeeId,
    number,
    cardholderName: card.cardholderName,
    securityCode: securityCode,
    expirationDate,
    password: card.password,
    isVirtual: true,
    originalCardId: cardId,
    isBlocked: false,
    type: card.type
  }

  await cardRepository.insert(cardData)

  const newCard = {
    cardNumber: number,
    cardholderName: card.cardholderName,
    securityCode: cvv,
    expirationDate
  }

  return {newCard}
}

export async function deleteVirtualCard(cardId: number, password: string) {
  const card = await cardRepository.findById(cardId)
  
  cardVerification.unregisteredCard(card)
  cardVerification.checkVirtualCard(card)
  cardVerification.checkPassword(card, password)
  
  await cardRepository.remove(cardId)
}

export async function activateCard(id: number, securityCode: string, password: string) {
  const card = await cardRepository.findById(id)

  cardVerification.unregisteredCard(card)
  cardVerification.expiredCard(card)
  cardVerification.activatedCard(card)

  cardVerification.checkSecurityCode(card, securityCode)
  
  password = bcrypt.hashSync(password, 10)

  await cardRepository.update(id, {...card, password})
}

export async function updateCardStatus(id: number, password: string, blockCard: boolean){
  const card = await cardRepository.findById(id)

  cardVerification.unregisteredCard(card)
  cardVerification.expiredCard(card)
  cardVerification.checkPassword(card, password)
  
  if(blockCard)
    cardVerification.blockedCard(card)
  else cardVerification.unblockedCard(card)

  await cardRepository.update(id, blockCard ? {isBlocked: true} : {isBlocked: false})
}

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

function formatName(name: string) {
  const fullName = name.split(' ')
  let cardName = fullName[0]

  for(let i = 1; i < fullName.length-1; i++){
    const name = fullName[i]
    if(name.length >= 3) cardName += " " + name[0]
  }
  cardName += " " + fullName[fullName.length-1]

  return cardName.toUpperCase()
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