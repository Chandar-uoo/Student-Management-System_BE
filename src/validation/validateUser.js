
const Joi = require("joi");

const validateUser = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .message("Full name must contain only letters and spaces")
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .required(),

  password: Joi.string()
    .trim()
    .min(6)
    .max(128)
    .required(),

  phoneNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .message("Phone number must be exactly 10 digits")
    .required(),

  address: Joi.string()
    .trim()
    .min(5)
    .max(200)
    .required(),
});

module.exports = validateUser;
