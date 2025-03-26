import express from "express";
import Post from "../models/Post.js";
import multer from "multer";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const router = express.Router();

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📝 Create Post (Only for 'editor' & 'admin')
router.post("/", verifyToken, verifyRole("editor", "admin"), upload.fields([{ name: "image" }, { name: "video" }]), async (req, res) => {
  try {
    let imageUrl = "";
    let videoUrl = "";

    if (req.files["image"]) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blog_posts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.files["image"][0].buffer).pipe(stream);
      });
      imageUrl = result.secure_url;
    }

    if (req.files["video"]) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blog_posts", resource_type: "video" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.files["video"][0].buffer).pipe(stream);
      });
      videoUrl = result.secure_url;
    }

    const newPost = new Post({
      ...req.body,
      author: req.user.id,
      image: imageUrl,
      video: videoUrl,
    });

    await newPost.save();
    res.status(201).json(newPost);
    console.log(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get Single Post by ID (Anyone can access)
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username role");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get All Posts (Anyone can access)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username role");
    res.status(200).json(posts);
    console.log(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📝 Update Post (Only for 'editor' & 'admin')
router.put("/:id", verifyToken, verifyRole("editor", "admin"), async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
    console.log(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑 Delete Post (Only for 'admin')
router.delete("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
    console.log(" post deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
