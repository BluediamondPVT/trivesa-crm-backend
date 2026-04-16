/**
 * Seed script to create test users in MongoDB
 * Run this once: node seedUsers.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('✓ Cleared existing users');

    // Create test users
    const users = [
      {
        email: 'admin@trivesa.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin'
      },
      {
        email: 'superadmin@trivesa.com',
        password: await bcrypt.hash('password123', 10),
        role: 'superadmin'
      }
    ];

    await User.insertMany(users);
    console.log('✓ Test users created successfully!');
    console.log('\nYou can now log in with:');
    console.log('  Admin: admin@trivesa.com / password123');
    console.log('  Super Admin: superadmin@trivesa.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
    process.exit(1);
  }
};

seedUsers();