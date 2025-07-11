import { uploadProfile } from '../middleware/middlewareImagesUpload.js'   
import { createProfile ,getProfile,deleteProfile,updateProfile } from "../controllers/createProfile.js";
import express from "express";

const profileRoutes = express.Router() 

profileRoutes.post('/create/profile',uploadProfile ,createProfile)
profileRoutes.get('/create/profile',getProfile)
profileRoutes.put('/create/profile',uploadProfile, updateProfile)
profileRoutes.delete('/create/profile',deleteProfile)

export default profileRoutes; 
