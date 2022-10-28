const { db, Sequelize } = require('../config/db');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    required: true,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

// Category.sync({ force: true });

module.exports = Category;
