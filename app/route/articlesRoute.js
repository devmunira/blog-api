import  {createArticle, deleteArticle, getAllArticles, getSingleArticle, updateArticle, updateOrCreateArticle} from '../controllers/articlesController.js';
import app  from 'express'
const articleRouter = app.Router()


// Articles related all route
articleRouter.route('/').get(getAllArticles).post(createArticle)
articleRouter.route('/:id')
.get(getSingleArticle)
.put(updateOrCreateArticle)
.patch(updateArticle)
.delete(deleteArticle)

// exports Articles route
export default articleRouter;