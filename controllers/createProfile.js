import MyProfile from "../models/CreateProfile.js";

export const createProfile = async (req, res) => {
    try {
      const { userId, Name, description } = req.body;
      
      // Check if both profile and showroom images are uploaded
      const Myimage = req.files && req.files.Myimage ? req.files.Myimage[0].filename : null;
      const showroomCardImage = req.files && req.files.showroomCardImage ? req.files.showroomCardImage[0].filename : null;
      console.log("images ",Myimage,"and images",showroomCardImage)
      if (!Myimage || !showroomCardImage) {
        return res.status(400).json({ message: "Both profile and showroom card images are required" });
      }
   
      if (!Name || !userId) {
        return res.status(400).json({ message: "Name and userId are required fields" });
      }
   
      // Create new profile
      const newProfile = new MyProfile({
        userId,
        Name,
        description,
        Myimage: Myimage,
        ShowroomCardImage: showroomCardImage
      });
      console.log("Profile ",newProfile);

      await newProfile.save();
      res.status(201).json({ message: "Profile added successfully", newProfile });
    } catch (error) {
      res.status(500).json({ message: "Profile creation failed", error });
    }
  };
  

export const getProfile = async(req,res) => {
    try {
        const Profile = await MyProfile.find()
        if (!Profile) return res.status(404).json({message: 'Profile not found'})
        res.json(Profile)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateProfile = async(req, res) => {
    try {
        const Profile = await MyProfile.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!Profile) return res.status(404).json({message: 'Profile not found'})
        res.status(404).json(car)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteProfile = async(req, res) => {
    try {
        const Profile = await MyProfile.findByIdAndDelete(req.params.id)
        if (!Profile) return res.status(404).json({message: 'Profile not found'})

            res.status(200).json({message: 'Profile deleted successfully'})
        
    } catch (error) {
        
    }
}






