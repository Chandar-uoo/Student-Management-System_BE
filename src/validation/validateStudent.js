const Joi = require("joi");

const validateStudent = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .message("Full name must contain only letters and spaces")
    .required(),

  DOB: Joi.date()
    .less("now")
    .message("Date of Birth must be a valid past date")
    .required(),

  gender: Joi.string().trim().valid("Male", "Female", "Other").required(),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),

  phoneNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .message("Phone number must be exactly 10 digits")
    .required(),

  address: Joi.string().trim().min(5).max(200).required(),

  studentClass: Joi.number()
    .integer()
    .min(1)
    .max(12)
    .required()
    .messages({
      "number.base": "Class must be a number between 1–12",
    }),

  rollNumber: Joi.string()
    .trim()
    .alphanum()
    .min(1)
    .max(20)
    .uppercase()
    .message("Roll number can only contain letters and numbers")
    .required(),

  guardianName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .message("Guardian name must contain only letters and spaces")
    .required(),


  year: Joi.number()
    .integer()
    .required()
    .messages({ "number.base": "Year must be a number" }),

  photo: Joi.string().optional(),
});

module.exports = validateStudent;
