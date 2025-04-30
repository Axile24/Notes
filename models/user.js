const Datastore = require('nedb-promises');
const uuid = require('uuid-random');
const { hashPassword } = require('../utils/utils');
const path = require('path');

// Initialize the database
const userDB = Datastore.create({
  filename: path.join(__dirname, '../database/usersDataBase.db'),
  autoload: true,
});

// Log database connection
console.log('Users database connected at:', path.join(__dirname, '../database/usersDataBase.db'));

// Create a new user
async function createUser(credentials) {
  const hashedPassword = await hashPassword(credentials.password);
  return await userDB.insert({
    uuid: uuid(),
    username: credentials.username,
    email: credentials.email,
    password: hashedPassword,
  });
}

// Find a user by username
async function findUserByUsername(username) {
  return await userDB.findOne({ username });
}

// Find a user by ID
async function findUserById(id) {
  return await userDB.findOne({ uuid: id });
}

module.exports = { createUser, findUserByUsername, findUserById };