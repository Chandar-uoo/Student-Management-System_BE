const validateStudent = require("../validation/validateStudent");
const fs = require("fs");

const validateStudentBody = (req, res, next) => {
    const body = {
      ...req.body,
      studentClass: Number(req.body.studentClass),
      year: Number(req.body.year),
      DOB: new Date(req.body.DOB),
    };
    console.log(body);
    
  const { error, value } = validateStudent.validate(body, { abortEarly: true, stripUnknown: true });

  if (error) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Failed to delete invalid upload:", err);
      });
    }
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
