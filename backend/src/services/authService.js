const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const logger = require('../utils/logger');

class AuthService {
  /**
   * Register a new user
   */
  static async register(userData) {
    const { name, email, password } = userData;
    
    // Check if user already exists
    const existingUser = User.findByEmail(email);
    if (existingUser) {
      logger.warn('Registration attempt with existing email', { email });
      throw new Error('Email already registered');
    }
}
}