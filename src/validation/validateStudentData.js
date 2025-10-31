 const studentSchema = require("../model/studentSchema");
 const { default: mongoose } = require("mongoose");
const AppError = require("../utils/AppError");

exports.validateStudentDetails = async ({fullName,email,rollNumber}) => {
 
  // Prepare query to check duplicates
  const existingStudent = await studentSchema.findOne({
    $or: [
      { email },
      { rollNumber },
      { fullName },
    ],
  });

  if (existingStudent) {
    let duplicateField = "";

    if (existingStudent.email === email) {
      duplicateField = "email";
    } else if (existingStudent.rollNumber === rollNumber) {
      duplicateField = "roll number";
    } else if (existingStudent.fullName === fullName) {
      duplicateField = "name";
    }

    throw new AppError(`Student with this ${duplicateField} already exists`, 400);
  }


}