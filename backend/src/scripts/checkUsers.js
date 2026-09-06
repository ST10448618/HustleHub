const config = require('../config');

const users = config.tempStorage.users;

console.log('\n📋 ALL USERS IN SYSTEM:');
console.log('='.repeat(40));

if (users.length === 0) {
    console.log('⚠️  No users found!');
} else {
    users.forEach((user, i) => {
        console.log(`\nUser ${i + 1}:`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Name: ${user.name}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Role: ${user.role}`);
    });
}
