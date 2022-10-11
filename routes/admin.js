const express = require('express');
const rarityController = require('../controllers/rarityController');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Router Rarity
router.get('/rarity', rarityController.rarityList);
router.get('/rarity/add', rarityController.rarityCreateGet);
router.post('/rarity/new', rarityController.rarityCreatePost);
router.get('/rarity/edit/:id', rarityController.rarityEditId);
router.post('/rarity/edit', rarityController.rarityEdit);
router.post('/rarity/del', rarityController.rarityDelete);

// Router Category
router.get('/category', categoryController.categoryList);
router.get('/category/add', categoryController.categoryCreateGet);
router.post('/category/new', categoryController.categoryCreatePost);
router.get('/category/edit/:id', categoryController.categoryEditId);
router.post('/category/edit', categoryController.categoryEdit);
router.post('/category/del', categoryController.categoryDelete);

module.exports = router;
