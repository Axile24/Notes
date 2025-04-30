const bcrypt = require('bcryptjs');

// Hash a password
async function hashPassword(password) {
  const paris = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, paris);
}

// Compare a password with its hash
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = { hashPassword, comparePassword };
