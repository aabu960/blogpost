import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/post/${id}`);
        if (!res.ok) {
          throw new Error("Post not found");
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading post...</div>;
  }

  if (!post) {
    return <div className="text-center py-10 text-red-500">Post not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {post.image && post.image.startsWith("http") ? (
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        ) : (
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}

        {/* Video Section */}
        {post.video && post.video.startsWith("http") ? (
          <video controls className="w-full h-64 rounded-lg mb-4">
            <source src={post.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}

        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-4">By {post.author?.username || "Unknown"}</p>
        <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: post.content }} />
        <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
          ← Back to News
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
