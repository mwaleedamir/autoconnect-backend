import mongoose from 'mongoose';

const myProfile = mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealer'
    },
    Name : {
        type: String,
         required: true
    },
    ShowroomCardImage : {   
        type: String,
         required: true
    },
    Myimage : {  
        type: String,
         required: true
    },
    description : {
        type: String,
    }
})
 
const MyProfile = mongoose.model('MyProfile',myProfile)

export default MyProfile;
