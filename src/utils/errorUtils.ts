export function invalidKey() {
  return { statusCode: 401, message: "Invalid API key" }
}

export function unregisteredEmployee(){
  return { statusCode: 404, message: "Employee not registered" }
}

export function cardNumberInUse(){
  return { statusCode: 409, message: "This number is already in use" }
}

export function duplicatedCardType(type: string){
  return { statusCode: 409, message: `This user already has a ${type} card` }
}

export function unregisteredCard(){
  return { statusCode: 404, message: "Card not registered" }
}

export function expiredCard(){
  return { statusCode: 401, message: "Expired card" }
}

export function activatedCard(){
  return { statusCode: 401, message: "Card is already active" }
}

export function deactivatedCard(){
  return { statusCode: 401, message: "Card is not active" }
}

export function invalidCVV(){
  return { statusCode: 401, message: "Invalid security code" }
}

export function incorrectPassword(){
  return { statusCode: 401, message: "Password is incorrect" }
}

export function unregisteredEstablishment(){
  return { statusCode: 401, message: "Establishment is not registered" }
}

export function differentCardType(){
  return { statusCode: 401, message: "Different card type" }
}