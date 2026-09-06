const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error('Error occurred', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id,
    body: req.body
  });

    
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  
  
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;

  }//if ends
  
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';

  }//if ends
  
  
  const response = {
    success: false,
    message: statusCode === 500 && process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : message
  };//response ends
