const Category = require('../models/Category');

exports.categoryList = (req, res) => {
  Category.findAll().then((categories) => {
    res.render('admin/category', { categories });
  }).catch((err) => {
    req.flash('error_msg', `Error finding categories! ${err.message}`);
    res.redirect('admin/');
  });
};

exports.categoryCreateGet = (req, res) => {
  res.render('admin/addCategory');
};

exports.categoryCreatePost = (req, res) => {
  const error = [];
  const { name, description } = req.body;
  if (!name) error.push({ text: 'Name error!' });
  if (name.lenght < 4) error.push({ text: 'very small name!' });
  if (name.startsWith(' ') || name.endsWith(' ')) error.push({ text: 'Category cannot start/end with space !' });
  if (error.length === 0) {
    Category.create({ name, description }).then(() => {
      req.flash('success_msg', 'Category created!');
      res.redirect('/admin/category');
    }).catch((err) => {
      req.flash('error_msg', `ERROR try again ${err.message}`);
      res.redirect('/admin/category');
    });
  } else {
    res.render('admin/addCategory', { name, error });
  }
};

exports.categoryEditId = (req, res) => {
  const { id } = req.params;
  Category.findOne({ where: { id } }).then((category) => {
    res.render('admin/editCategory', { category });
  }).catch((err) => {
    req.flash('error_msg', `Error ${err.message}`);
    res.render('/admin/category');
  });
};

exports.categoryEdit = (req, res) => {
  const { id, name, description } = req.body;
  Category.findOne({ where: { id } }).then((category) => {
    const error = [];
    if (!name) error.push({ text: 'Error!' });
    if (name.length < 3) error.push({ text: 'Error! Very short name!' });
    if (error.length > 0) {
      req.flash('error_msg', 'ERROR');
      res.redirect(`/admin/category/edit/${id}`);
    } else if (name.startsWith(' ') || name.endsWith(' ')) {
      req.flash('error_msg', 'Category cannot start/end with space !');
      res.redirect(`/admin/category/edit/${id}`);
    } else {
      const newCategory = category;
      newCategory.name = name;
      newCategory.description = description;

      newCategory.save().then(() => {
        req.flash('success_msg', 'Edited!');
        res.redirect('/admin/category');
      }).catch((err) => {
        req.flash('error_msg', `ERROR! ${err.message}`);
      });
    }
  }).catch((err) => {
    req.flash('error_msg', `ERROR! ${err.message}`);
    res.redirect('admin/category');
  });
};

exports.categoryDelete = (req, res) => {
  const { checkbox } = req.body;

  Category.destroy({ where: { id: checkbox } }).then(() => {
    req.flash('success_msg', 'Category deleted!');
    res.redirect('/admin/category');
  }).catch((err) => {
    req.flash('error_msg', `ERROR ! ${err.message}`);
  });
};
