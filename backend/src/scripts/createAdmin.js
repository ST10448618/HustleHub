const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/User');

async function createAdmin() {
    // Check if admin already exists
    const existing = User.findByEmail('admin@example.com');

    if (existing) {
        console.log('Admin already exists:', existing.toSafeObject());
        return;
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash('AdminPass123!', 10);
}
