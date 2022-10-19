const { db, Sequelize } = require('../config/db');
const Category = require('./Category');
const Rarity = require('./Rarity');

const Item = db.define('item', {
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  categoryId: {
    type: Sequelize.INTEGER,
  },
  rarityId: {
    type: Sequelize.INTEGER,
  },
});

Item.belongsTo(Category, { foreingnKey: 'categoryId', allowNull: true });
Item.belongsTo(Rarity, { foreingnKey: 'rarityId', allowNull: true });

// Item.sync({ force: true });

module.exports = Item;
