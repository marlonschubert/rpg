const Item = require('../models/Item');
const Category = require('../models/Category');
const Rarity = require('../models/Rarity');

exports.itemList = (req, res) => {
  Rarity.findAll().then((rarities) => {
    Category.findAll().then((categories) => {
      Item.findAll(
        {
          include: [
            {
              model: Category,
            },
            {
              model: Rarity,
            },
          ],
        },
      ).then((items) => {
        res.render('admin/item', { items, rarities, categories });
      });
    });
  }).catch((err) => {
    req.flash('error_msg', `Error finding items! ${err.message}`);
    res.redirect('admin/item');
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
  const error = [];

  const {
    name, price, categoryId, rarityId,
  } = req.body;

  if (!name) error.push({ text: 'Name Invalid!' });
  if (name.length < 4) error.push({ text: 'Short name!' });
  if (name.startsWith(' ') || name.endsWith(' ')) error.push({ text: 'Name cannot start/end with space !' });
  if (!price) error.push({ text: 'Price invalid! ' });
  if (error.length === 0) {
    Item.create({
      name, price, categoryId, rarityId,
    }).then(() => {
      req.flash('success_msg', 'Item created!');
      res.redirect('/admin/item');
    }).catch((err) => {
      req.flash('error_msg', `Error!! ${err}`);
    });
  } else {
    res.render('admin/addItem', { name, error });
  }
};

exports.itemEditId = (req, res) => {
  const { id } = req.params;
  Item.findOne({
    where: { id },
    include: [{
      model: Category,
    },
    { model: Rarity }],
  }).then((item) => {
    Category.findAll().then((categories) => {
      Rarity.findAll().then((rarities) => {
        res.render('admin/editItem', { item, categories, rarities });
      });
    });
  }).catch((err) => {
    req.flash('error_msg', `Error to edit! ${err}`);
    res.redirect('/admin/item');
  });
};

exports.itemEdit = (req, res) => {
  const {
    id, name, price, categoryId, rarityId,
  } = req.body;
  Item.findOne({ where: { id } }).then((item) => {
    const error = [];
    if (!name) error.push({ text: 'Name Invalid!' });
    if (name.startsWith(' ') || name.endsWith(' ')) error.push({ text: 'Name cannot start/end with space !' });
    if (!price) error.push({ text: 'Price invalid! ' });

    if (error === 0) {
      const newItem = item;
      newItem.name = name;
      newItem.price = price;
      newItem.categoryId = categoryId;
      newItem.rarityId = rarityId;

      newItem.save().then(() => {
        req.flash('success_msg', 'Edited');
        res.redirect('/admin/item');
      }).catch((err) => {
        req.flash('error_msg', `ERROR ${err.message}`);
      });
    }
  }).catch((err) => {
    req.flash('error_msg', `Error ${err.message}`);
    res.redirect('/admin/item');
  });
};

exports.itemDelete = (req, res) => {
  const { checkbox } = req.body;
  if (!checkbox) {
    Item.destroy({ where: { id: checkbox } }).then(() => {
      res.redirect('/admin/item');
    });
  }
};
