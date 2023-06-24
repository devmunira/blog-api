const { getAllArticles, createArticle, getSingleArticle, updateOrCreateArticle, updateArticle, deleteArticle } = require('../controllers/articlesController');
const router = require('express').Router();

// Articles related all route
router.route('/').get(getAllArticles).post(createArticle)
router.route('/:id')
.get(getSingleArticle)
.put(updateOrCreateArticle)
.patch(updateArticle)
.delete(deleteArticle)

// exports Articles route
module.exports = router