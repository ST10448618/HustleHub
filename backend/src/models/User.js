const config = require('../config');

class User {
  constructor({ name, email, passwordHash, role = 'CLIENT' }) {
    this.id = config.tempStorage.nextId++;
    this.name = name;
    this.email = email.toLowerCase().trim();
    this.passwordHash = passwordHash;
    this.role = role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
