import joi from "joi"

export const createCard = joi.object({
  employeeId: joi.number().required(),
  type: joi.string().valid(
    'groceries', 
    'restaurant', 
    'transport', 
    'education', 
    'health')
  .required()
})

export const activateCard = joi.object({
  securityCode: joi.string().length(3).required(),
  password: joi.string().length(4).regex(/^[0-9]{4}$/).required()
})