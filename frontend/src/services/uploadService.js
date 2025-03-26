import express from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const router = express.Router();

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Generate Pre-Signed URL for Secure Uploads
router.get("/upload/s3-presigned-url", async (req, res) => {
  const { fileType } = req.query;
  if (!fileType) return res.status(400).json({ error: "File type is required" });

  const fileKey = `uploads/${uuidv4()}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
    Expires: 60, // URL valid for 60 seconds
    ContentType: fileType,
    ACL: "public-read",
  };

  try {
    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
    res.json({ uploadUrl, fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}` });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Could not generate signed URL" });
  }
});

export default router;
