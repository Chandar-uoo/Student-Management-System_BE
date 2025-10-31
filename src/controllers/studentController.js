const studentService = require("../services/studentService");
const path = require("path"); 
const fs = require("fs");



const deleteOldPhoto = (photoPath) => {
  if (!photoPath) {
    console.log(" No photo path provided");
    return;
  }

  const filename = photoPath.split("/uploads/")[1];
  if (!filename) {
    console.log(" Filename not found in photoPath:", photoPath);
    return;
  }

const filePath = path.join(__dirname, "../../uploads", filename);

  console.log("🧾 Trying to delete file at:", filePath);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(" Deleted old photo:", filePath);
  } else {
    console.log("File not found at path:", filePath);
  }
};
exports.addStudentController = async (req, res) => {
  if (req.file) {
    req.body.photo = `uploads/${req.file.filename}`;
  }
  const { newStudent } = await studentService.addStudentService(req);
  res.status(201).json({
    sucess: true,
    message: "successfully Student created",
    data: newStudent,
  });
};


exports.updateStudentController = async (req, res) => {
  if (req.file) {
    req.body.photo = `uploads/${req.file.filename}`;
  }

  await studentService.updateStudentService(req, deleteOldPhoto);

  res.status(204).json({
    sucess: true,
    message: "successfully Student details updated",
  });
};

exports.deleteStudentController = async (req, res) => {
  await studentService.deleteStudentSevice(req,deleteOldPhoto);
  res.status(204).json({
    sucess: true,
    message: "successfully Student Deleted",
  });
};
exports.searchStudentController = async (req, res) => {
  const { students } =
    await studentService.searchStudentService(req);
  res.status(200).json({
    sucess: true,
    message: "successfully Student Deleted",
    data: students,
  });
};
exports.readAllStudentController = async (req, res) => {
  const { students } = await studentService.readAllStudentService();
  res.status(200).json({
    sucess: true,
    message: "successfully Students Fetched",
    data: students,
  });
};

exports.studentAnalyticsController = async (req, res) => {
  const { result } = await studentService.studentAnalyticsService();
  
  res.status(200).json({
    sucess: true,
    message: "successfully Students Analytics Fetched",
    data: result,
  });
};
