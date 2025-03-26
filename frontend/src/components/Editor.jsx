import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Editor = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!["editor", "admin"].includes(role)) {
      alert("Access denied!");
      navigate("/");
    }
  }, [role, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleVideoChange = (e) => setVideo(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("image", image);
    if (video) data.append("video", video);

    try {
      await axios.post("http://localhost:5000/post/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/newsportal");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Error uploading post!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <ReactQuill value={formData.content} onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))} theme="snow" className="h-60 mb-3" />

      <label className="block mb-2">Upload Image:</label>
      <input type="file" onChange={handleImageChange} className="w-full border p-2 mb-3" />

      <label className="block mb-2">Upload Video:</label>
      <input type="file" onChange={handleVideoChange} className="w-full border p-2 mb-3" />

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Publish
      </button>
    </div>
  );
};

export default Editor;
