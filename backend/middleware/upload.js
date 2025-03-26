import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Cloudinary storage settings
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blog-images', // Change folder name if needed
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Allowed file formats
  },
});

const upload = multer({ storage });

export default upload;
