const { getAllComments, createComment, getSingleComment, updateComment, deleteComment } = require('../controllers/commentController');
const router = require('express').Router();

// comments related all route
router.route('/').get(getAllComments).post(createComment)
router.route('/:id')
.get(getSingleComment)
.patch(updateComment)
.delete(deleteComment)

// exports comments route
module.exports = router