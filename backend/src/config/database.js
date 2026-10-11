const mongoose = require('mongoose');
const config = require('./index');
const logger = require('../utils/logger');

const FALLBACK_DNS_SERVERS = ['8.8.8.8', '8.8.4.4', '1.1.1.1'];

async function connectDB() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('FATAL: Failed to connect to MongoDB', {
      message: error.message
    });
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error', { message: err.message });
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });
}

/**
 * Cleanly closes the MongoDB connection. Used during graceful shutdown.
 */
async function disconnectDB() {
  await mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };