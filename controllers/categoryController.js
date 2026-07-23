const Category = require('../models/Category');

exports.renderCategoryPage = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('categoryList', { categories });
  } catch (err) {
    res.status(500).send('Error loading categories: ' + err.message);
  }
};

exports.createCategory = async (req, res) => {
  try {
    await Category.create({ name: req.body.name });
    res.redirect('/categories/manage');
  } catch (err) {
    res.status(500).send('Error creating category: ' + err.message);
  }
};

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send('Error fetching categories: ' + err.message);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, { name: req.body.name });
    res.redirect('/categories/manage');
  } catch (err) {
    res.status(500).send('Error updating category: ' + err.message);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/categories/manage');
  } catch (err) {
    res.status(500).send('Error deleting category: ' + err.message);
  }
};
