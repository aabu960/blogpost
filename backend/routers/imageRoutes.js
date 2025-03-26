import express from 'express';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ imageUrl: req.file.path }); // Cloudinary returns the image URL
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

export default router;
