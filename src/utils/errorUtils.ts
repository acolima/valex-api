export function invalidKey() {
  return {status: 401, message: "Invalid API key"}
}

export function unregisteredEmployee(){
  return {status: 404, message: "Employee not registered"}
}

export function cardNumberInUse(){
  return {status: 409, message: "This number is already in use"}
}

export function duplicatedCardType(type: string){
  return {status: 409, message: `This user already has a ${type} card`}
}