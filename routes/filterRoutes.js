import express from 'express';
import { filterCars } from '../controllers/filterCars.js';

const router = express.Router();

// GET all cars (with optional basic query parameters)
router.get('/filter', filterCars);

export default router;