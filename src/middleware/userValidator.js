const validateUser = require("../validation/validateUser"); // your Joi schema

const validateUserBody = (req, res, next) => {
  const { error, value } = validateUser.validate(req.body, { abortEarly: true,stripUnknown: true }); 
console.log(error);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details[0].message,
    });
  }

  req.body = value; 
  next();
};

module.exports = validateUserBody;
