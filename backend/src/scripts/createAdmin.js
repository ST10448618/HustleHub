const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/User');
const { connectDB, disconnectDB } = require('../config/database');

async function createAdmin() {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    console.error(
      'ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must all be set in your ' +
      '.env file before running this script.'
    );
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findByEmail(email);
  if (existing) {
    console.log('A user with this email already exists:');
    console.log(JSON.stringify(existing.toSafeObject(), null, 2));
    await disconnectDB();
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, config.bcryptRounds);

  const admin = await User.create({
    name,
    email,
    passwordHash,
    role: 'ADMIN'
  });

  console.log('Admin user created successfully!');
  console.log(JSON.stringify(admin.toSafeObject(), null, 2));

  await disconnectDB();
  process.exit(0);
}

createAdmin();
