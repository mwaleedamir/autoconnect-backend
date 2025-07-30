// import cardata from '../models/CardataSchema.js';

// export const filterCars = async (req, res) => {
//   try {
//     const {
//       carMake,
//       model,
//       color,
//       engineCapacity,
//       priceMin,
//       priceMax,
//       mileage,
//       category,
//       location,
//       showroomId,
//       page = 1,
//       limit = 10
//     } = req.query;

//     const query = {};

//     if (carMake) query.carMake = { $in: carMake.split(',') };
//     if (model) query.model = { $in: model.split(',') };
//     if (color) query.color = { $in: color.split(',') };
//     if (engineCapacity) query.engineCapacity = { $in: engineCapacity.split(',').map(Number) };
//     if (category) query.varients = { $in: category.split(',') };
//     if (location) query.registeredIn = { $in: location.split(',') };
//     if (showroomId) query.userId = showroomId;
//     if (priceMin || priceMax) {
//       const numericMin = parseFloat(priceMin);
//       const numericMax = parseFloat(priceMax);

//       query.carPrice = {
//         ...(priceMin && !isNaN(numericMin) && { $gte: numericMin }),
//         ...(priceMax && !isNaN(numericMax) && { $lte: numericMax }),
//       };
//     }
//     if (mileage) query.mileage = { $lte: parseInt(mileage) };

//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const cars = await cardata.find(query).skip(skip).limit(parseInt(limit));
//     const total = await cardata.countDocuments(query);

//     res.status(200).json({ cars, total });
//   } catch (error) {
//     console.error("Error filtering cars:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };


// controllers/filterCars.js
import Car from '../models/CardataSchema.js'; // Adjust import path as needed
import User from '../models/DealerSchema.js'; // For showroom data

// Main filtering function
export const filterCars = async (req, res) => {
  try {
    const {
      // Array filters
      make,
      categories,
      colors,
      location,
      engineCapacity,
      year,
      
      // Range filters
      priceMin,
      priceMax,
      mileageMin,
      mileageMax,
      
      // Single value filters
      mileage,
      showroom,
      searchQuery,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      
      // Pagination
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    let filter = {};

    // Handle array filters
    if (make) {
      const makeArray = make.split(',').map(m => m.trim());
      filter.carMake = { $in: makeArray };
    }

    if (categories) {
      const categoriesArray = categories.split(',').map(c => c.trim());
      filter.category = { $in: categoriesArray };
    }

    if (colors) {
      const colorsArray = colors.split(',').map(c => c.trim());
      filter.color = { $in: colorsArray };
    }

    if (location) {
      const locationArray = location.split(',').map(l => l.trim());
      filter.location = { $in: locationArray };
    }

    if (engineCapacity) {
      const engineArray = engineCapacity.split(',').map(e => e.trim());
      filter.engineCapacity = { $in: engineArray };
    }

    if (year) {
      const yearArray = year.split(',').map(y => parseInt(y.trim()));
      filter.year = { $in: yearArray };
    }

    // Handle range filters
    if (priceMin || priceMax) {
      filter.carPrice = {};
      if (priceMin) filter.carPrice.$gte = parseInt(priceMin);
      if (priceMax) filter.carPrice.$lte = parseInt(priceMax);
    }

    if (mileageMin || mileageMax) {
      filter.mileage = {};
      if (mileageMin) filter.mileage.$gte = parseInt(mileageMin);
      if (mileageMax) filter.mileage.$lte = parseInt(mileageMax);
    }

    // Handle single mileage filter (if using slider)
    if (mileage && !mileageMin && !mileageMax) {
      filter.mileage = { $lte: parseInt(mileage) };
    }

    // Handle showroom filter
    if (showroom) {
      filter.userId = showroom;
    }

    // Handle search query
    if (searchQuery) {
      filter.$or = [
        { carMake: { $regex: searchQuery, $options: 'i' } },
        { carName: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } },
        { color: { $regex: searchQuery, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const cars = await Car.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'showroomName email') // Populate showroom info
      .lean();

    // Get total count for pagination
    const total = await Car.countDocuments(filter);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    res.status(200).json({
      success: true,
      data: cars,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        total,
        limit: parseInt(limit),
        hasNextPage,
        hasPrevPage
      },
      // Also include flat properties for compatibility
      cars,
      total,
      page: parseInt(page),
      limit: parseInt(limit)
    });

  } catch (error) {
    console.error('Filter cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Error filtering cars',
      error: error.message
    });
  }
};

// Get all cars without filters (basic listing)
export const getAllCars = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const cars = await Car.find({})
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'showroomName email')
      .lean();

    const total = await Car.countDocuments({});

    res.status(200).json({
      success: true,
      data: cars,
      cars,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });

  } catch (error) {
    console.error('Get all cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cars',
      error: error.message
    });
  }
};

// Get single car by ID
export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id)
      .populate('userId', 'showroomName email phone location')
      .lean();

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      data: car,
      car
    });

  } catch (error) {
    console.error('Get car by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching car',
      error: error.message
    });
  }
};

// Get cars by showroom ID
export const getCarsByShowroom = async (req, res) => {
  try {
    const { showroomId } = req.params;
    const {
      page = 1,
      limit = 20,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const cars = await Car.find({ userId: showroomId })
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'showroomName email')
      .lean();

    const total = await Car.countDocuments({ userId: showroomId });

    // Get showroom info
    const showroom = await User.findById(showroomId).select('showroomName email phone location').lean();

    res.status(200).json({
      success: true,
      data: cars,
      cars,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      showroom
    });

  } catch (error) {
    console.error('Get cars by showroom error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching showroom cars',
      error: error.message
    });
  }
};

// Get filter options for dropdowns
export const getFilterOptions = async (req, res) => {
  try {
    // Get unique values for each filter field
    const [makes, categories, colors, locations, engineCapacities, years, priceRange] = await Promise.all([
      Car.distinct('carMake'),
      Car.distinct('category'),
      Car.distinct('color'),
      Car.distinct('location'),
      Car.distinct('engineCapacity'),
      Car.distinct('year'),
      Car.aggregate([
        {
          $group: {
            _id: null,
            minPrice: { $min: '$carPrice' },
            maxPrice: { $max: '$carPrice' }
          }
        }
      ])
    ]);

    // Get mileage range
    const mileageRange = await Car.aggregate([
      {
        $group: {
          _id: null,
          minMileage: { $min: '$mileage' },
          maxMileage: { $max: '$mileage' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        makes: makes.filter(Boolean),
        categories: categories.filter(Boolean),
        colors: colors.filter(Boolean),
        locations: locations.filter(Boolean),
        engineCapacities: engineCapacities.filter(Boolean),
        years: years.filter(Boolean).sort((a, b) => b - a), // Sort years descending
        priceRange: priceRange[0] || { minPrice: 0, maxPrice: 10000000 },
        mileageRange: mileageRange[0] || { minMileage: 0, maxMileage: 500000 }
      }
    });

  } catch (error) {
    console.error('Get filter options error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
};

// Search cars by text
export const searchCars = async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchQuery = q.trim();
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Create search filter
    const searchFilter = {
      $or: [
        { carMake: { $regex: searchQuery, $options: 'i' } },
        { carName: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } },
        { color: { $regex: searchQuery, $options: 'i' } },
        { location: { $regex: searchQuery, $options: 'i' } }
      ]
    };

    const cars = await Car.find(searchFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'showroomName email')
      .lean();

    const total = await Car.countDocuments(searchFilter);

    res.status(200).json({
      success: true,
      data: cars,
      cars,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      searchQuery
    });

  } catch (error) {
    console.error('Search cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching cars',
      error: error.message
    });
  }
};