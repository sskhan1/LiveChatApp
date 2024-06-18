const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const { isAuthenticatedUser } = require("../middleware/auth");

//send friend request to other user.
router.post('/send-friend-request', isAuthenticatedUser, friendController.sendFriendRequest);

//get all friend requests of users
router.get('/friend-requests', isAuthenticatedUser, friendController.getFriendRequests);

//Accept friend requests
router.put('/accept-friend-request/:requestId', isAuthenticatedUser, friendController.acceptFriendRequest);

//Reject friend requests
router.put('/reject-friend-request/:requestId', isAuthenticatedUser, friendController.rejectFriendRequest);

//Get Friend list
router.get('/friend-list', isAuthenticatedUser, friendController.getFriendList);
module.exports = router;
