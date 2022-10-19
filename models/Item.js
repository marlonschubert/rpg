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

Item.belongsTo(Category);
Item.belongsTo(Rarity);

// Item.sync({ force: true });

module.exports = Item;
