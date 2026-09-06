const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

module.exports = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  
  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
  
  // Rate limiting
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100, // 100 requests per window
  
  tempStorage: {
    users: [],
    nextId: 1
  }
};