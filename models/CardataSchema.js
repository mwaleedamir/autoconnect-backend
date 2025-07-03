import mongoose from 'mongoose';

const carInfo = mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owner'
    },
    carName : {
        type: String,
         required: true
    },
    carMake : {
        type: String,
         required: true
    },
    engineCapacity : {
        type: Number,
         required: true
    },
    carPrice : {
        type: String,
         required: true
    },
    color :{
        type: String,
         required: true
    },
    mileage : {
        type: Number,
         required: true
    },
    model : {
        type: Number,
         required: true
    },
    importedFrom : {
        type: String,
         required: true
    },
    registeredIn : {
        type: String,
         required: true
    },
    varients : { 
        type: String,
         required: true
    },
    images : [{  
        type: Object,
         required: true
    }],
    description : {
        type: String,
    }
})
 
const Cardata = mongoose.model('Cardata',carInfo)

export default Cardata;
