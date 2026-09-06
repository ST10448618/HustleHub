const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./src/app');
const config = require('./src/config');
const logger = require('./src/utils/logger');

const PORT = config.port;

// Load SSL certificates
let server;

try {
  const certPath = path.join(__dirname, 'certificates');
  const keyPath = path.join(certPath, 'key.pem');
  const certPathFile = path.join(certPath, 'cert.pem');
  
  if (fs.existsSync(keyPath) && fs.existsSync(certPathFile)) {
    const httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPathFile)
    };
    server = https.createServer(httpsOptions, app);
    logger.info('SSL certificates loaded successfully');
    console.log('HTTPS server running with SSL');
  } else {
    logger.warn('SSL certificates not found. Falling back to HTTP.');
    const http = require('http');
    server = http.createServer(app);
    console.log('HTTP server running (no SSL)');
  }
} catch (error) {
  logger.error('Failed to load SSL certificates', { error: error.message });
  const http = require('http');
  server = http.createServer(app);
  console.log('HTTP server running (no SSL)');
}