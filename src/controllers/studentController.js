const studentService = require("../services/studentService");

const fs = require("fs");



const deleteOldPhoto = (photoPath) => {
  if (photoPath && fs.existsSync(photoPath)) {
    fs.unlinkSync(photoPath);
    console.log("🗑️ Deleted old photo:", photoPath);
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
  await studentService.deleteStudentSevice(req);
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
