// services/deleteImage.js
import { cloudinary } from '../utils/cloudinary.js';

export const deleteImageById = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    throw new Error(`Failed to delete image: ${err.message}`);
  }
};
