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

// Start server
server.listen(PORT, () => {
  const protocol = server instanceof https.Server ? 'https' : 'http';
  console.log('='.repeat(60));
  console.log('HUSTLEHUB+ API SERVER');
  console.log('='.repeat(60));
  console.log(`Server running at: ${protocol}://localhost:${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Health check: ${protocol}://localhost:${PORT}/health`);
  console.log('='.repeat(60));
  console.log('Available endpoints:');
  console.log('  POST   /api/v1/auth/register  - Register new user');
  console.log('  POST   /api/v1/auth/login     - Login user');
  console.log('  GET    /api/v1/auth/me        - Get current user (Protected)');
  console.log('  GET    /api/v1/admin/users    - List all users (Admin only)');
  console.log('  GET    /health                - Health check');
  console.log('='.repeat(60));

    // ============================================
  // CREATE DEFAULT ADMIN USER IF NONE EXISTS
  // ============================================
  const User = require('./src/models/User');
  const bcrypt = require('bcrypt');
  
  const existingUsers = User.findAll();
  if (existingUsers.length === 0) {
    console.log('\n  No users found. Creating default admin...');
    
    bcrypt.hash('AdminPass123!', 10, (err, hash) => {
      if (err) {
        console.error('  Failed to hash password:', err.message);
        return;
      }
      
      const admin = User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        passwordHash: hash,
        role: 'ADMIN'
      });
      
      console.log('  Default admin created successfully!');
      console.log('   Email: admin@example.com');
      console.log('   Password: AdminPass123!');
      console.log('   Role: ADMIN');
      console.log('   ID: ' + admin.id);
    });
  } else {
    console.log(`\n  Users already exist: ${existingUsers.length}`);
    const admin = User.findByEmail('admin@example.com');
    if (admin) {
      console.log(`   Admin exists: ${admin.email} (${admin.role})`);
    }
  }
  // ============================================
});
