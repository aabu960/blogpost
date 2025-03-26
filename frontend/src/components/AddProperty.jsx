import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset");

    const { data } = await axios.post("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", formData);
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("ownerToken");

    let imageUrl = "";
    if (image) {
      imageUrl = await handleImageUpload(image);
    }

    await axios.post("http://localhost:5000/api/owners/add-property", {
      title,
      price,
      image: imageUrl
    }, { headers: { Authorization: `Bearer ${token}` } });

    navigate("/owner/dashboard");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Add New Property</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg">
        <input type="text" placeholder="Property Title" value={title} onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4" required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full mb-4" required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2 w-full mb-4" required />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddProperty;
