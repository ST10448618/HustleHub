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
      
  // Check Bearer scheme
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      logger.warn('Invalid Authorization header format', {
        path: req.path,
        ip: req.ip
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid token format. Use: Bearer <token>'
      });
    }
    
    const token = parts[1];

        // Verify token
    const decoded = AuthService.verifyToken(token);
    
    // Get user from storage
    const user = AuthService.getUserById(decoded.userId);
    if (!user) {
      logger.warn('Valid token but user not found', {
        userId: decoded.userId,
        path: req.path
      });
      return res.status(401).json({
        success: false,
        message: 'User associated with this token no longer exists.'
      });
    }
}
