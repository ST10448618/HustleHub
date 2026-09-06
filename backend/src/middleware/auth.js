const AuthService = require('../services/authService');
const logger = require('../utils/logger');

/**
 * JWT Authentication Middleware
 */
const authenticate = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      logger.warn('Protected route accessed without token', {
        path: req.path,
        method: req.method,
        ip: req.ip
      });
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid JWT token.'
      });
    }
  }
}