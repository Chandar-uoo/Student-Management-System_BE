const validateStudent = require("../validation/validateStudent");

const validateStudentBody = (req, res, next) => {
    const body = {
      ...req.body,
      studentClass: Number(req.body.studentClass),
      year: Number(req.body.year),
      DOB: new Date(req.body.DOB),
    };
    
  const { error, value } = validateStudent.validate(body, { abortEarly: true, stripUnknown: true });

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

module.exports = validateStudentBody;
