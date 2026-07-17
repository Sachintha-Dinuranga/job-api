import User from "../models/users.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";

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
  sendToken(user, 200, res);
});

// Login user => /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email or password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  // find user in db
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Check if passoword is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Create jwt token
  sendToken(user, 200, res);
});
