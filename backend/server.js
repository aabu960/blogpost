import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routers/authRoutes.js';
import protectedRoutes from './routers/protectedRoutes.js';
import uploadRoutes from "./routers/uploadRoutes.js";
import postRoutes from "./routers/postRoutes.js";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

// ✅ Updated CORS to allow both local and Render frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://blogpost-cl1v.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Routes
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.use('/post', postRoutes);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
