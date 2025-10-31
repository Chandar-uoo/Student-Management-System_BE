const express = require("express");
const authRouter = express.Router();
authRouter.use(express.json());
const catchAsync = require('../utils/catchAsync')
const authController = require("../controllers/authController")
const validateUserBody =  require("../middleware/userValidator")
// signup
authRouter.post("/signup",validateUserBody, catchAsync(authController.signup));
// login
authRouter.post("/login",catchAsync(authController.login));
// logout
authRouter.post('/logout',catchAsync(authController.logout));
// access token renewal
authRouter.get('/refresh-token',catchAsync(authController.refreshToken))

module.exports = { authRouter }