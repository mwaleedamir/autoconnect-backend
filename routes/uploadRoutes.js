// routes/uploadRoutes.js
import express from 'express';
import upload from '../utils/multer.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'car-images',
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.status(500).json({ error: 'Cloudinary upload failed', details: err.message });
  }
});

export default router;
