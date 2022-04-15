import joi from "joi"

export const recharge = joi.object({
  amount: joi.number().min(1).required()
})