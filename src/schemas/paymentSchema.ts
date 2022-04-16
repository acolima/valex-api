import joi from "joi"

export const payment = joi.object({
  password: joi.string().length(4).required(), 
  businessId: joi.number().required(), 
  amount: joi.number().min(1).required()
})