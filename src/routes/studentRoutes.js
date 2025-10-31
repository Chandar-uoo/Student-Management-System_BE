const express = require("express");
const studentRouter = express.Router();
studentRouter.use(express.json());
const catchAsync = require('../utils/catchAsync')
const validateStudentBody =  require("../middleware/studentValidator")
const studentController = require("../controllers/studentController")
const upload =  require("../middleware/upload")
const {auth} =  require("../middleware/authMiddleware")
// add
studentRouter.post("/add",auth,validateStudentBody, catchAsync(studentController.addStudentController));
// update
studentRouter.put("/update/:id",auth,validateStudentBody,catchAsync(studentController.updateStudentController));
// search
studentRouter.get('/search',auth,catchAsync(studentController.searchStudentController));
// delete
studentRouter.delete('/delete/:id',auth,catchAsync(studentController.deleteStudentController))
//read
studentRouter.get('/read',auth,catchAsync(studentController.readAllStudentController));
//dashBoard Analytics
 studentRouter.get('/analytics',auth,catchAsync(studentController.studentAnalyticsController)); 



module.exports = { studentRouter }