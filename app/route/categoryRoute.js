import { getAllCategories, createCategory, updateOrCreateCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

import app  from 'express'
const router = app.Router()



// categories related all route
router.route('/').get(getAllCategories).post(createCategory)
router.route('/:id')
.put(updateOrCreateCategory)
.patch(updateCategory)
.delete(deleteCategory)


// exports categories route
export default router