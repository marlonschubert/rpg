const { db, Sequelize } = require('../config/db');

const Rarity = db.define('rarity', {
  name: {
    type: Sequelize.STRING,
    required: true,
    unique: true,
  },
});

// Rarity.sync({ force: true });

module.exports = Rarity;
