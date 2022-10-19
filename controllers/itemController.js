const Item = require('../models/Item');
const Category = require('../models/Category');
const Rarity = require('../models/Rarity');

exports.itemList = (req, res) => {
  Rarity.findAll().then((rarities) => {
    Category.findAll().then((categories) => {
      Item.findAll().then({
        include: [
          {
            attributes: ['name'],
            model: Category,
            required: true,
          },
          {
            attributes: ['name'],
            model: Rarity,
            required: true,
          }, { order: [['name', 'ASC']] },
        ],
      }).then((items) => {
        res.render('admin/item', { items, rarities, categories });
      });
    });
  }).catch((err) => {
    req.flash('error_msg', `Error finding items! ${err.message}`);
    res.redirect('admin/');
  });
};

exports.itemCreateGet = (req, res) => {
  Category.findAll().then((categories) => {
    Rarity.findAll().then((rarities) => {
      res.render('admin/addItem', { categories, rarities });
    });
  });
};

exports.itemCreatePost = (req, res) => {
  const { name, price } = req.body;
  const { categoryId, rarityId } = req.body;
  Item.create({
    name, price, categoryId, rarityId,
  }).then(() => {
    res.redirect('/admin/item');
  });
};
