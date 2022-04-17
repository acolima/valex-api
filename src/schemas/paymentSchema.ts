import joi from "joi"

export const payment = joi.object({
  password: joi.string().length(4).required(), 
  businessId: joi.number().required(), 
  amount: joi.number().min(1).required()
})

export const onlinePayment = joi.object({
  cardNumber: joi.string().required(),
  cardHolderName: joi.string().required(),
  expirationDate: joi.string().required(),
  securityCode: joi.string().required(),
  establishmentId: joi.number().required(),
  amount: joi.number().min(1).required()
})