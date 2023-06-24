const { getSingleUser, createUser, updateOrCreateUser, updateUser, deleteUser } = require('../controllers/userController');
const router = require('express').Router();

// Users related all route
router.route('/').get(getSingleUser).post(createUser)
router.route('/:id')
.get(getSingleUser)
.put(updateOrCreateUser)
.patch(updateUser)
.delete(deleteUser)


// exports users route
module.exports = router