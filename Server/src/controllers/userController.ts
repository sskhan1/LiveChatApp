import { Request, Response, NextFunction } from 'express';
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userSchema");
// const ErrorHandler = require("../utils/errorHandler");

const sendToken = require("../utils/jwtToken");
// const cloudinary = require("cloudinary");

// Create/Signup User
export const signup = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// Login User
// exports.login = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;
//   // checking if user has given password and email both

//   if (!email || !password) {
//     return next(new ErrorHandler("Please Enter Email & Password", 400));
//   }

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     return next(new ErrorHandler("Invalid email or password", 401));
//   }

//   const isPasswordMatched = await user.comparePassword(password);

//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid email or password", 401));
//   }

//   sendToken(user, 200, res);
// });

// // Logout User
// exports.logout = catchAsyncErrors(async (req, res, next) => {
//   res.cookie("token", "none", {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });

//   res.status(200).json({
//     success: true,
//     message: "Logged out successfully",
//   });
// });

// // Upload Profile Picture
// exports.uploadProfilePicture = catchAsyncErrors(async (req, res, next) => {
//   const user = req.user; // Authenticated user

//   if (!req.file) {
//     return next(new ErrorHandler("Please upload a file", 400));
//   }

//   //  const result = await cloudinary.v2.uploader.upload(req.file.path, {
//   //   folder: 'profilePics',
//   //   width: 150,
//   //   crop: 'scale',
//   //  });

//   //  user.profilePicture = {
//   //   public_id: result.public_id,
//   //   url: result.secure_url,
//   //  };

//   await user.save();

//   res.status(200).json({
//     success: true,
//     message: "Profile picture uploaded successfully",
//     profilePicture: user.profilePicture,
//   });
// });

// // Get a list of all users
// exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
//   const users = await User.find().select("-password");

//   res.status(200).json({
//     success: true,
//     users,
//   });
// });
