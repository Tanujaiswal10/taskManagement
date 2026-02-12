const userService = require("../service/userService");

exports.register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await userService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token
    });

  } catch (error) {
    next(error);
  }
};
