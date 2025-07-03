import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser'
import userRouter from './routes/AuthRoutes.js';
import createCarRoutes from './routes/CreateCarRoutes.js';
// import StripeRoute from './Stripe/StripeRoute.js'
import profileRoutes from './routes/Profile.js ';

dotenv.config() 
const app = express()
const port = process.env.PORT  

app.use(cors(
  {
  credentials : false,  
  origin: process.env.ORIGIN_URI 
} 
));  
app.use(express.json())
app.use(cookieparser())
app.use(express.static('uploads'))
app.use('/auth',userRouter)
app.use('/api',createCarRoutes)
app.use('/api',profileRoutes) 
// app.use('/api',StripeRoute)
  

mongoose.connect(process.env.MONGO_URI) 
  .then(() => {
      console.log("Connected to DB");   
      app.listen(port, () => {
      console.log(`Listening on PORT ${port}`);
    }); 
  })
  .catch((error) => {
    console.error("Error connecting to DB:", {message : error});   
  }); 