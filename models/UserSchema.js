import mongoose from 'mongoose'
const AuthSchema  = mongoose.Schema({
    firstName : {
        type: String,
        required :true,
    },
    lastName : {
        type: String,
        required :true,
    },
    role :{
        type: String,
        required : true,
        enum:['user','admin'],
        default: 'user'
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
})

const User = mongoose.model('User',AuthSchema)
export default User