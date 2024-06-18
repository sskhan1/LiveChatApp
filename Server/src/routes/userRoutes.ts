const expressApp = require('express');
const userController = require('../controllers/userController.ts');
const { isAuthenticatedUser } = require("../middleware/auth");
const upload = require('../middleware/upload');

const router = expressApp.Router();


// Create/Signup User
router.post(`/signup`, userController.signup);

// Login User
// router.post(`/login`, userController.login);

// Logout User
// router.post(`/logout`, userController.logout);

//profile picture upload (authenticated user)
// router.post('/upload-profile-picture', isAuthenticatedUser, upload.single('profilePicture'), userController.uploadProfilePicture);

// Get list of all users (authenticated user)
// router.get('/users', isAuthenticatedUser, userController.getAllUsers);

module.exports = router;
