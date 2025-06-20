import { GetUsers, UserSignup, DeleteUser, UserLogin,Logout, UpdateUser } from "../controllers/userSignup.js";
import {getownerById,getowners,ownerLogout,ownerlogin,ownerSignup,deleteowner,updateowner} from '../controllers/ownerSignup.js'
import express from 'express'

const userRouter = express.Router()

userRouter.get('/user', GetUsers),
userRouter.post('/user', UserSignup),
userRouter.post('/user/login', UserLogin),
userRouter.post('/user/logout', Logout),
userRouter.delete('/user/:id', DeleteUser),
userRouter.put('/user/:id', UpdateUser)  

userRouter.get('/owner', getowners), 
userRouter.get('/owner/:id', getownerById),
userRouter.post('/owner', ownerSignup),
userRouter.post('/owner/logout', ownerLogout),
userRouter.post('/owner/login', ownerlogin),
userRouter.put('/owner/:id', updateowner),
userRouter.delete('/owner/:id', deleteowner)


export default userRouter;