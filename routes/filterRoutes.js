// import express from 'express';
// import { filterCars } from '../controllers/filterCars.js';

// const router = express.Router();

// // GET all cars (with optional basic query parameters)
// router.get('/filter', filterCars);

// export default router;

// routes/filterRoutes.js
import express from 'express';
import { 
  filterCars, 
  getAllCars, 
  getCarById, 
  getCarsByShowroom, 
  getFilterOptions, 
  searchCars 
} from '../controllers/filterCars.js';

const router = express.Router();

// GET all cars with filters (main filtering endpoint)
router.get('/filter', filterCars);

// GET all cars without filters (basic listing)
router.get('/cars', getAllCars);

// GET single car by ID
router.get('/filter/:id', getCarById);

// GET cars by showroom ID
router.get('/cars/showroom/:showroomId', getCarsByShowroom);

// GET filter options for dropdowns
router.get('/cars/filter-options', getFilterOptions);

// GET search cars by text
router.get('/cars/search', searchCars);

export default router;