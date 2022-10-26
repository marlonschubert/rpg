const { db, Sequelize } = require('../config/db');
const Category = require('./Category');
const Rarity = require('./Rarity');

const Item = db.define('item', {
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  categoryId: Sequelize.INTEGER,
  rarityId: Sequelize.INTEGER,
});

Item.belongsTo(Category, { foreingnKey: 'categoryId', onDelete: 'cascade' });
Item.belongsTo(Rarity, { foreingnKey: 'rarityId', onDelete: 'cascade' });

// Item.sync({ force: true });

module.exports = Item;
