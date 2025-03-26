import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  image: String,
  video: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
