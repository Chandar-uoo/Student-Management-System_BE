const studentService = require("../services/studentService");




exports.addStudentController = async (req, res) => {

  const { newStudent } = await studentService.addStudentService(req);
  res.status(201).json({
    sucess: true,
    message: "successfully Student created",
    data: newStudent,
  });
};

exports.updateStudentController = async (req, res) => {


  await studentService.updateStudentService(req);

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
