const studentSchema = require("../model/studentSchema");
const mongoose = require("mongoose");
const AppError = require("./AppError");
const fs = require("fs");

exports.validateStudentUpdateDetails = async ({
  id,
  fullName,
  email,
  rollNumber,
  photo,
  deleteOldPhoto
}) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid request: ID is not valid", 400);
  }

  //  Fetch the student 
  const currentStudent = await studentSchema.findById(id);
  if (!currentStudent) {
    throw new AppError("Student not found", 404);
  }

  //  Check duplicates 
  const duplicateStudent = await studentSchema.findOne({
    $or: [{ email }, { rollNumber }, { fullName }],
    _id: { $ne: id } 
  });

  if (duplicateStudent) {
    let duplicateField = "";
    if (duplicateStudent.email === email) duplicateField = "email";
    else if (duplicateStudent.rollNumber === rollNumber) duplicateField = "roll number";
    else if (duplicateStudent.fullName === fullName) duplicateField = "name";

    throw new AppError(`Student with this ${duplicateField} already exists`, 400);
  }

 
  if (photo && photo !== currentStudent.photo) {
    deleteOldPhoto(currentStudent.photo);
  }

 
};
