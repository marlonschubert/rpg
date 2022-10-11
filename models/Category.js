const { db, Sequelize } = require('../config/db');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    required: true,
  },
});

module.exports = Category;
