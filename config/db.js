const Sequelize = require('sequelize');

const db = new Sequelize('postgres://app:P@$$w0rd@127.0.0.1:5432/rpg');

db.authenticate().then(() => console.log('Server connected'))
  .catch((err) => console.log(`Error connecting ${err}`));

module.exports = {
  Sequelize,
  db,
};
