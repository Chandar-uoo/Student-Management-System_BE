const authServices = require("../services/authServices");
exports.signup = async (req, res) => {
  const {  refreshToken, accessToken } =
    await authServices.signupService(req);

  res
    .status(201)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 5 * 60 * 60 * 1000,
      sameSite: true,
    })
    .json({
      sucess: true,
      message: "successfully user created",
      accessToken,
    });
};
exports.login = async (req, res) => {
  const {  refreshToken, accessToken } =
    await authServices.loginService(req);
  res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 6 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "login sucessfull",
      accessToken,
    });
};

exports.logout = async (req, res) => {
  await authServices.logoutService(res);
  res.status(200).json({
    success: true,
    message: "logout Suceesfully",
  });
};
exports.refreshToken = async (req, res) => {
  const { accessToken } = await authServices.accessTokenRenwal(req);
  res.status(200).json({
    success: true,
    message: "new access token genrated",
    accessToken,
  });
};
