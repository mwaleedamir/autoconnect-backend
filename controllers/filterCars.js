import cardata from '../models/CardataSchema.js';

export const filterCars = async (req, res) => {
  try {
    const {
      carMake,
      model,
      color,
      engineCapacity,
      priceMin,
      priceMax,
      mileage,
      category,
      location,
      showroomId,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (carMake) query.carMake = { $in: carMake.split(',') };
    if (model) query.model = { $in: model.split(',') };
    if (color) query.color = { $in: color.split(',') };
    if (engineCapacity) query.engineCapacity = { $in: engineCapacity.split(',').map(Number) };
    if (category) query.varients = { $in: category.split(',') };
    if (location) query.registeredIn = { $in: location.split(',') };
    if (showroomId) query.userId = showroomId;
    if (priceMin || priceMax) {
      const numericMin = parseFloat(priceMin);
      const numericMax = parseFloat(priceMax);

      query.carPrice = {
        ...(priceMin && !isNaN(numericMin) && { $gte: numericMin }),
        ...(priceMax && !isNaN(numericMax) && { $lte: numericMax }),
      };
    }
    if (mileage) query.mileage = { $lte: parseInt(mileage) };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const cars = await cardata.find(query).skip(skip).limit(parseInt(limit));
    const total = await cardata.countDocuments(query);

    res.status(200).json({ cars, total });
  } catch (error) {
    console.error("Error filtering cars:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
