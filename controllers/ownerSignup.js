import owner from "../models/DealerSchema.js";
import user from "../models/UserSchema.js";
import bcryptjs from 'bcryptjs'
import JWT from 'jsonwebtoken'

export const ownerSignup = async (req, res) => {
    try {
        const {firstName,lastName,email,phone,showroomName,showroomAddress,cityName,password,confirmPassword } =req.body;
        const existOwner = await owner.findOne({email})
        const existUser = await user.findOne({email})
        if(existUser) return res.status(400).json({message:"you are already a User"})
        if (existOwner) return res.status(400).json({ message: "This email already exists" });

        const hashpassword = bcryptjs.hashSync(password,10) 
 
        const newowner = await owner.create({firstName,lastName,email,phone,showroomName,showroomAddress,cityName, password:hashpassword, confirmPassword:hashpassword });
        await newowner.save();
        res.status(201).json({ message: "Registered Sucessfully",newowner});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const ownerlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Please provide email and password" });
        }
        const owners = await owner.findOne({ email });
        if (!owners) return res.status(400).json({ message: "Invalid email or password" });
        const isMatch = await bcryptjs.compareSync(password, owners.password);
        if(isMatch) {
            const token = JWT.sign({ id: owner._id }, process.env.SECRET_KEY_OWNER,{expiresIn : '1m'});
            res.cookie("token",token,{
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000), 
                httpOnly: true,
                secure: false,
            })
            res.status(200).json({message:"Logged in Sucessfully",owners,token})
        }
        else{
            return res.status(400).json({ message: "Wrong Password" });
        }
    }catch(error){
        res.status(400).json({ message: "Response error",error });
    }
} 

export const ownerLogout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: false }); 
  
    res.status(200).json({ message: 'Logged out successfully' });
  };

export const getowners = async (req, res) => {
    try {
        const owners = await owner.find();
        res.status(200).json(owners);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getownerById = async (req, res) => {
    try {
        const owner = await owner.findById(req.params.id);
        if (owner) return res.status(200).json(owner);
        res.status(404).json({ message: "owner not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

export const updateowner = async (req, res) => {
    try {
        const owner = await owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (owner) return res.status(200).json(owner);
        res.status(404).json({ message: "owner not found" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const deleteowner = async (req, res) => {
    try {
        const owner = await owner.findByIdAndDelete(req.params.id);
        if (owner) return res.status(204).json({ message: "owner deleted successfully" });
        res.status(404).json({ message: "owner not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}