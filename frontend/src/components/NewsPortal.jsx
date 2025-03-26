import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsPortal = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/post");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading posts...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Ensure image URL is valid */}
            {post.image && post.image.startsWith("http") ? (
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">No Image Available</p>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + "..." }}
              />
              <p className="text-sm text-gray-500">By {post.author?.username || "Unknown"}</p>
               {/* "Read More" Button */}
               <Link to={`/post/${post._id}`} className="block mt-4 text-blue-600 hover:underline">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPortal;
