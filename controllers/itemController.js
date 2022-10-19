const Item = require('../models/Item');

exports.itemList = (req, res) => {
  Item.findAll().then((items) => {
    res.render('admin/item', { items });
  }).catch((err) => {
    req.flash('error_msg', `Error finding items! ${err.message}`);
    res.redirect('admin/');
  });
};

exports.itemCreateGet = (req, res) => {
  res.render('admin/addItem');
};

exports.itemCreatePost = (req, res) => {
  const { name } = req.body;
  Item.create({ name }).then(() => {
    res.redirect('/admin/item');
  }).catch((err) => {
    console.log(`Deu errado mula  ${err}`);
  });
};
