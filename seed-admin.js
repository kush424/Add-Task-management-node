// One-time script to create the FIRST admin account.
// Run once from terminal:  node seed-admin.js
// This is the only way an admin account can ever be created —
// there is no public web page for it, so no one can create an
// admin account by themselves through the browser.

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');
const User = require('./models/User');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const username = await ask('Admin username: ');
  const password = await ask('Admin password: ');

  const existing = await User.findOne({ username });
  if (existing) {
    console.log('❌ That username already exists.');
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed, role: 'admin' });
    console.log('Admin account created. You can now log in at /login');
  }

  rl.close();
  mongoose.connection.close();
})();
