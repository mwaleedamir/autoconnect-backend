import mongoose from "mongoose";

const DealerSchema = mongoose.Schema({
   firstName : {
        type: String,
        required :true,
    },
    lastName : {
        type: String,
        required :true,
    },
    email : {
        type : String, 
        required : true,
        unique : true
    }, 
    phone : {
        type: String,
        required:true
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type : String,
        required : true
    },
    showroomName :{
        type : String,
        required : true,
        unique :true
    },
    showroomAddress :{
        type : String,
        required : true
    },
    cityName :{
        type : String,
        required : true
    }
})

const owner = mongoose.model('owner',DealerSchema)
export default owner