import cardata from '../models/CardataSchema.js'
export const createCar = async(req,res) =>{
    try {
        const {userId,carName,carMake,engineCapacity,carPrice,mileage,color,model,importedFrom,registeredIn,varients,description,time} = req.body
         
        const images = req.files ? req.files.map(file => file.filename) : [];
        if(!images.length){
            return res.status(404).json({message:"image not found"})
        }
        
        if(!carName || !carMake || !engineCapacity || !carPrice || !mileage || !color || !model || !importedFrom || !registeredIn || !varients || !userId){
            return res.status(404).json({message:"fields are empty"})``
        } 
        console.log({carName,carMake,engineCapacity,carPrice,mileage,color,model,importedFrom,registeredIn,varients,images,description,userId,time})

        const newCar = await cardata.create({userId,carName,carMake,engineCapacity,carPrice,mileage,color,model,importedFrom,registeredIn,varients,description,images,time})
        await newCar.save()
        res.status(201).json({message : "added sucessfully ",newCar})
    } catch (error) {
        res.status(500).json({message:"data not created",error})
    }
 
}

export const getCar = async(req,res) => {
    try {
        const car = await cardata.find()
        if (!car) return res.status(404).json({message: 'Car not found'})
        res.json(car)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateCar = async(req, res) => {
    try {
        const car = await cardata.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!car) return res.status(404).json({message: 'Car not found'})
        res.status(404).json(car)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteCar = async(req, res) => {
    try {
        const car = await cardata.findByIdAndDelete(req.params.id)
        if (!car) return res.status(404).json({message: 'Car not found'})

            res.status(200).json({message: 'Car deleted successfully'})
        
    } catch (error) {
        
    }
}






