const userSchema = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

exports.signupService = async (req) => {
  const { fullName, email, password, phoneNumber, address } = req.body;
  const hashedpassword = await bcrypt.hash(password, 10);
  const refreshKey = process.env.REFRESH_TOKEN;
  const accessKey = process.env.ACCESS_TOKEN;
  const newUser = await userSchema.create({
    fullName,
    email,
    address,
    phoneNumber,
    password: hashedpassword
  });
  const refreshToken = jwt.sign({ id: newUser._id }, refreshKey, {
    expiresIn: "5h",
  });
  const accessToken = jwt.sign({ id: newUser._id }, accessKey, {
    expiresIn: "15m",
  });
  return { refreshToken, accessToken };
};


exports.loginService = async (req) => {
  /*input*/
  const { email, password } = req.body;
  const emailExist = await userSchema.findOne({ email });

  /*input validations*/
  if (!emailExist) {
    throw new AppError("Invalid email or password", 400);
  }
  const verifyMatch = await bcrypt.compare(password, emailExist.password);

  if (!verifyMatch) {
    throw new AppError("Invalid email or password", 400);
  }
  const refreshKey = process.env.REFRESH_TOKEN;
  const accessKey = process.env.ACCESS_TOKEN;

  const refreshToken = await jwt.sign({ id: emailExist._id }, refreshKey, {
    expiresIn: "5h",
  });
  const accessToken = await jwt.sign({ id: emailExist._id }, accessKey, {
    expiresIn: "5h",
  });

  
  return { refreshToken, accessToken };
};

// logout
exports.logoutService = ( res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
};

exports.accessTokenRenwal = async (req) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new AppError("No refreshToken found", 401);
  }
  const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN);
  const user = await userSchema.findById(decoded.id);
  if (!user) {
    throw new AppError("No user found", 401);
  }
  const accessKey = process.env.ACCESS_TOKEN;
  const accessToken = await jwt.sign({ id: user._id }, accessKey, {
    expiresIn: "5h",
  });

  return { accessToken };
};
