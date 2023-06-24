const { getAllCategories, createCategory, updateOrCreateCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const router = require('express').Router();

// categories related all route
router.route('/').get(getAllCategories).post(createCategory)
router.route('/:id')
.put(updateOrCreateCategory)
.patch(updateCategory)
.delete(deleteCategory)


// exports categories route
module.exports = router