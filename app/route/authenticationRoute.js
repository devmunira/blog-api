import { userLogin, userRegister } from '../controllers/authController.js';
import app  from 'express'
const router = app.Router()


// authenticated related all route
router.post('/login' , userLogin)
router.post('/register' , userRegister)

// exports authenticated route
export default router