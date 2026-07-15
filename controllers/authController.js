import User from "../models/users.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// Register a new user => /api/v1/register
export const registerUSer = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Create jwt token
  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    message: "User is registered.",
    token,
  });
});
