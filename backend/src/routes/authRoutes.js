const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { 
  validateRegister, 
  validateLogin, 
  handleValidationErrors 
} = require('../validation/authValidation');
const { authenticate } = require('../middleware/auth');