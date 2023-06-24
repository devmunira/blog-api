const { userLogin, userRegister } = require('../controllers/authController');
const router = require('express').Router();

// authenticated related all route
router.post('/login' , userLogin)
router.post('/register' , userRegister)

// exports authenticated route
module.exports = router