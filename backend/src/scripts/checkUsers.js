const User = require('../models/User');
const { connectDB, disconnectDB } = require('../config/database');

async function checkUsers() {
  await connectDB();

  console.log('\nALL USERS IN SYSTEM:');
  console.log('='.repeat(40));

  const users = await User.findAllUsers();

  if (users.length === 0) {
    console.log('No users found!');
  } else {
    users.forEach((user, i) => {
      console.log(`\nUser ${i + 1}:`);
      console.log(`  ID: ${user.id}`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  PasswordHash exists: ${user.passwordHash ? 'YES' : 'NO'}`);
    });
  }

  console.log('\n' + '='.repeat(40));

  // Check specifically for the configured admin email, if set
  if (process.env.ADMIN_EMAIL) {
    const admin = await User.findByEmail(process.env.ADMIN_EMAIL);
    if (admin) {
      console.log('\nAdmin user found:');
      console.log(`   Role: ${admin.role}`);
      console.log(`   PasswordHash: ${admin.passwordHash ? 'Set' : 'MISSING'}`);
    } else {
      console.log('\nAdmin user NOT found for ADMIN_EMAIL in .env!');
    }
  }

  await disconnectDB();
  process.exit(0);
}

checkUsers().catch(async (err) => {
  console.error('Failed to check users:', err.message);
  await disconnectDB();
  process.exit(1);
});