const { Category } = require('../models');

// Endpoint to create a new category.
const createCategory = async (req, res) => {
  const { category_name, category_description } = req.body;

  try {
    const category = await Category.create({ category_name, category_description });
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};

module.exports = { createCategory };
