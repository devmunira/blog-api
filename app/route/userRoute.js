import app  from 'express'
const userRouter = app.Router()
import {createUser, deleteUser, getAllUsers, getSingleUser, updateOrCreateUser, updateUser} from "../controllers/userController.js"


// Users related all route
userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id')
.get(getSingleUser)
.put(updateOrCreateUser)
.patch(updateUser)
.delete(deleteUser)


// exports users route
export default  userRouter