const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userSchema');
const ErrorHandler = require('../utils/errorHandler');

// Send Friend Request
exports.sendFriendRequest = catchAsyncErrors(async (req, res, next) => {
 const { userId } = req.body;
 const senderId = req.user._id; // The sender's user ID from the authenticated user

 if (!userId) {
  return next(new ErrorHandler('Please provide the user ID', 400));
 }

 // Find the recipient user
 const recipient = await User.findById(userId);

 if (!recipient) {
  return next(new ErrorHandler('User not found', 404));
 }

 // Check if a friend request already exists
 const existingRequest = recipient.friendRequests.find(request => request.sender.equals(senderId));
 if (existingRequest) {
  return next(new ErrorHandler('Friend request already sent', 400));
 }

 // Add the friend request
 recipient.friendRequests.push({ sender: senderId });
 await recipient.save();

 res.status(200).json({
  success: true,
  message: 'Friend request sent successfully',
 });
});

// Get Friend Requests for Authenticated User
exports.getFriendRequests = catchAsyncErrors(async (req, res, next) => {
 const userId = req.user._id; // Get the authenticated user's ID

 const user = await User.findById(userId).populate('friendRequests.sender', 'name'); // Populate the sender's name

 const friendRequests = user.friendRequests;

 res.status(200).json({
  success: true,
  friendRequests,
 });
});


// Accept Friend Request
exports.acceptFriendRequest = catchAsyncErrors(async (req, res, next) => {
 const requestId = req.params.requestId; // Friend request ID
 const acceptorId = req.user._id; // The authenticated user's ID

 if (!requestId) {
  return next(new ErrorHandler('Friend request ID is missing', 400));
 }

 // Find the authenticated user
 const acceptor = await User.findById(acceptorId);

 if (!acceptor) {
  return next(new ErrorHandler('User not found', 404));
 }

 // Find the friend request to accept
 const friendRequest = acceptor.friendRequests.find(request => request._id.equals(requestId));

 if (!friendRequest) {
  return next(new ErrorHandler('Friend request not found', 404));
 }

 // Remove the request from the acceptor's friendRequests
 acceptor.friendRequests = acceptor.friendRequests.filter(request => !request._id.equals(requestId));

 // Add the sender to the acceptor's friends list
 acceptor.friends.push(friendRequest.sender);

 await acceptor.save();

 res.status(200).json({
  success: true,
  message: 'Friend request accepted successfully',
 });
});

// Reject Friend Request
exports.rejectFriendRequest = catchAsyncErrors(async (req, res, next) => {
 const requestId = req.params.requestId; // Friend request ID
 const rejecterId = req.user._id; // The authenticated user's ID

 if (!requestId) {
  return next(new ErrorHandler('Friend request ID is missing', 400));
 }

 // Find the authenticated user
 const rejecter = await User.findById(rejecterId);

 if (!rejecter) {
  return next(new ErrorHandler('User not found', 404));
 }

 // Find the friend request to reject
 const friendRequest = rejecter.friendRequests.find(request => request._id.equals(requestId));

 if (!friendRequest) {
  return next(new ErrorHandler('Friend request not found', 404));
 }

 // Remove the request from the rejecter's friendRequests
 rejecter.friendRequests = rejecter.friendRequests.filter(request => !request._id.equals(requestId));

 await rejecter.save();

 res.status(200).json({
  success: true,
  message: 'Friend request rejected successfully',
 });
});

// Get Friend List
exports.getFriendList = catchAsyncErrors(async (req, res, next) => {
 const userId = req.user._id; // The authenticated user's ID

 // Find the authenticated user
 const user = await User.findById(userId).populate('friends', 'name'); // Populate friends' names

 if (!user) {
  return next(new ErrorHandler('User not found', 404));
 }

 const friendList = user.friends;

 res.status(200).json({
  success: true,
  friendList,
 });
});