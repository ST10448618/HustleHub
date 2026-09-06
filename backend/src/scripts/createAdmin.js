const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/User');

async function createAdmin() {
    const existing = User.findByEmail('admin@example.com');
    if (existing) {
        console.log('Admin already exists');
        return;
    }
    
    const passwordHash = await bcrypt.hash('AdminPass123!', 10);
    
    const admin = User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        passwordHash: passwordHash,
        role: 'ADMIN'
    });
    
    console.log('Admin user created successfully!');
    console.log(JSON.stringify(admin.toSafeObject(), null, 2));
}

createAdmin();