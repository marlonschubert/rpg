const Rarity = require('../models/Rarity');

exports.rarityList = (req, res) => {
  Rarity.findAll().then((rarities) => {
    res.render('admin/rarity', { rarities });
  }).catch((err) => {
    req.flash('error_msg', `Error adding rarity ! ${err.message}`);
    res.redirect('admin');
  });
};

exports.rarityCreateGet = (req, res) => {
  res.render('admin/addRarity');
};

exports.rarityCreatePost = (req, res) => {
  const error = [];
  const { name } = req.body;
  if (!name) error.push({ text: 'Name error!' });
  if (name.length < 4) error.push({ text: 'Name error!' });
  if (name.startsWith(' ') || name.endsWith(' ')) error.push({ text: 'Rarity cannot start/end with space !' });
  if (error.length === 0) {
    Rarity.create({ name }).then(() => {
      req.flash('success_msg', 'Rarity created!');
      res.redirect('/admin/rarity');
    }).catch((err) => {
      req.flash('error_msg', `Error! Try again ${err.message}`);
      res.redirect('/admin/rarity');
    });
  } else {
    res.render('admin/addRarity', { name, error });
  }
};

exports.rarityEditId = (req, res) => {
  const { id } = req.params;
  Rarity.findOne({ where: { id } }).then((rarity) => {
    res.render('admin/editRarity', { rarity });
  }).catch((err) => {
    req.flash('error_msg', `Error edit! ${err.message}`);
    res.redirect('/admin/rarity');
  });
};

exports.rarityEdit = (req, res) => {
  const { id, name } = req.body;
  Rarity.findOne({ where: { id } }).then((rarity) => {
    const error = [];
    if (!name) error.push({ text: 'Error!' });
    if (name.length < 3) {
      req.flash('error_msg', 'Name Invalid!');
      res.redirect(`/admin/rarity/edit/${id}`);
    } else if (name.startsWith(' ') || name.endsWith(' ')) {
      req.flash('error_msg', 'Name Invalid!');
      res.redirect(`/admin/rarity/edit/${id}`);
    } else {
      const newRarity = rarity;
      newRarity.name = name;
      newRarity.save().then(() => {
        req.flash('success_msg', 'Edited!');
        res.redirect('/admin/rarity');
      }).catch((err) => {
        req.flash('error_msg', `ERROR ${err.message}`);
      });
    }
  }).catch((err) => {
    req.flash('error_msg', `Error ${err.message}`);
    res.redirect('/admin/rarity');
  });
};

exports.rarityDelete = (req, res) => {
  const { checkbox } = req.body;
  if (!checkbox) {
    req.flash('error_msg', 'Select an id!');
    res.redirect('/admin/rarity');
  } else {
    Rarity.destroy({ where: { id: checkbox } }).then(() => {
      req.flash('success_msg', 'Rarity deleted!');
      res.redirect('/admin/rarity');
    }).catch((err) => {
      req.flash('error_msg', `Error to delete rarity! ${err.message}`);
    });
  }
};
