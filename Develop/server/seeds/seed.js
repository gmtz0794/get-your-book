const db = require('../config/connection');
const { Tech, User } = require('../models');
const cleanDB = require('./cleanDB');

const techData = require('./techData.json');

db.once('open', async () => {
  await cleanDB('Tech', 'teches');

  await cleanDB('User', 'users');

  await Tech.insertMany(techData);

  console.log('Data seeded!');
  process.exit(0);
});