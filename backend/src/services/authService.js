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

    // Hash password
    const passwordHash = await bcrypt.hash(password, config.bcryptRounds);
    
    // Create user (default role: CLIENT)
    const user = User.create({
      name,
      email,
      passwordHash,
      role: 'CLIENT'
    });
    
    logger.info('User registered successfully', { 
      userId: user.id, 
      email: user.email,
      role: user.role 
    });
    
    return user.toSafeObject();
  }

    /**
   * Login user and generate JWT
   */
  static async login(email, password) {
    // Find user by email
    const user = User.findByEmail(email);
    if (!user) {
      logger.warn('Login attempt with non-existent email', { email });
      throw new Error('Invalid email or password');
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      logger.warn('Login attempt with invalid password', { email });
      throw new Error('Invalid email or password');
    }

        // Generate JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpire }
    );
    
    logger.info('User logged in successfully', { 
      userId: user.id, 
      email: user.email,
      role: user.role 
    });
    
    return {
      token,
      user: user.toSafeObject()
    };

}
}