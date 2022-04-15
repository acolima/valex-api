import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
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
  securityCode = bcrypt.hashSync(securityCode, 10)

  const cardData = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: undefined,
    isBlocked: false,
    type
  }

  await cardRepository.insert(cardData)
}

export async function activateCard(id: number, securityCode: string, password: string) {
  const card = await cardRepository.findById(id)

  cardVerification.registeredCard(card)
  cardVerification.expiredCard(card)
  cardVerification.activatedCard(card)

  if(!bcrypt.compareSync(securityCode, card.securityCode))
    throw error.invalidCVV()
  
  password = bcrypt.hashSync(password, 10)

  await cardRepository.update(id, {...card, password})
}

export async function rechargeCard(id: number, amount: number) {
  const card = await cardRepository.findById(id)
  
  cardVerification.registeredCard(card)
  cardVerification.expiredCard(card)
  cardVerification.deactivatedCard(card)

  const recharge = {
    cardId: Number(id),
    amount
  }

  rechargeRepository.insert(recharge)
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