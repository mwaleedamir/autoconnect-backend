import { createCar, getCar,updateCar,getCarById ,deleteCar } from "../controllers/createCar.js";
import express from "express";
import upload  from '../middleware/middlewareImagesUpload.js'   

 
const routes = express.Router() 

routes.post('/create',upload.array('images',10), createCar),
routes.get('/create', getCar),
routes.get('/create/:id',getCarById)
routes.put('/create/:id',upload.array('images',10), updateCar),
routes.delete('/create/:id', deleteCar) 

export default routes

