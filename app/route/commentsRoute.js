import { getAllComments, createComment, getSingleComment, updateComment, deleteComment } from '../controllers/commentController.js';
import app  from 'express'
const router = app.Router()

// comments related all route
router.route('/').get(getAllComments).post(createComment)
router.route('/:id')
.get(getSingleComment)
.patch(updateComment)
.delete(deleteComment)

// exports comments route
export default router