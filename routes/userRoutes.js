const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

// Create a new user
router.post('/', userController.createUser);

// Get user by ID
router.get('/',authMiddleware, userController.getUserById);
router.post('/details', userController.getUserByID);

// Update user details
router.put('/update', authMiddleware,userController.updateUser);
router.post('/contact-us', userController.contactUs);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
