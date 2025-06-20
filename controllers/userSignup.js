import owner from "../models/DealerSchema.js";
import User from "../models/UserSchema.js";
import bcryptjs from "bcryptjs"
import JWT from 'jsonwebtoken'
  
export const UserSignup = async(req,res) =>{
    try {
        const {firstName,lastName,email,phone,password,confirmPassword} = req.body;

        const existOwner = await owner.findOne({email})
        const existUser = await User.findOne({email})
        if(existOwner) return res.status(400).json({message:"You are already a owner"})
        if (existUser) return res.status(400).json({ message: "This email already exists" });
        
        const hashpassword = await bcryptjs.hashSync(password,10)

        const user = await User.create({firstName,lastName,email,phone, password:hashpassword, confirmPassword:hashpassword})
        await user.save()
        res.status(201).json({message : "registered sucessfully", user})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
} 

export const UserLogin = async(req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({message: 'Please provide email and password'})
        }      
        const user = await User.findOne({email})
        if (!user) return res.status(404).json({message:"Invalid email or password"})
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) return res.status(400).json({message: 'Wrong Password'})
        const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY_USER);
        res.cookie('token', token, {
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // Expires in 2 hours
            httpOnly: true,
            secure: false
          });
        res.status(200).json({message: 'Logged in successfully',user ,token})
    }catch(error) {
        res.status(400).json({error : err.message})
    }

}

export const Logout = (req,res) =>{
    res.clearCookie('token', { httpOnly: true, secure: false }); 
  
    res.status(200).json({ message: 'Logged out successfully' });
}

export const UpdateUser = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!user) return res.status(404).json({message: 'User not found'})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


export const DeleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({message: 'User not found'})
        res.status(200).json({message: 'User deleted successfully'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const GetUsers = async(req, res) => {
    try {
        const Users = await User.find()
        res.status(200).json(Users)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

