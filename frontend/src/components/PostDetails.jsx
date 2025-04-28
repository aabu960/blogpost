import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]); // For popular, new posts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/post/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/post");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPost();
    fetchAllPosts();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading post...</div>;
  }

  if (!post) {
    return <div className="text-center py-10 text-red-500">Post not found</div>;
  }

  const popularPosts = posts.slice(0, 5); // Top 5 popular (dummy for now)
  const newPosts = [...posts].reverse().slice(0, 5); // Last 5 posts
  const categories = [...new Set(posts.map((p) => p.category || "Uncategorized"))]; // Unique categories

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Article Section */}
      <div className="lg:col-span-2">
        <div className="bg-white shadow-lg rounded-lg p-6">
          {post.image && post.image.startsWith("http") ? (
            <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-lg mb-4" />
          ) : (
            <div className="w-full h-72 bg-gray-300 flex items-center justify-center rounded-lg mb-4">
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

          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <p>By {post.author?.username || "Unknown"}</p>
            <span className="mx-2">•</span>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="text-gray-800 leading-7" dangerouslySetInnerHTML={{ __html: post.content }} />

          <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
            ← Back to News
          </Link>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="space-y-8">
        {/* Popular Posts */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Popular Posts</h2>
          <ul className="space-y-3">
            {popularPosts.map((p) => (
              <li key={p._id}>
                <Link to={`/post/${p._id}`} className="text-blue-600 hover:underline">
                  {p.title.length > 50 ? p.title.substring(0, 50) + "..." : p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* New Posts */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">New Posts</h2>
          <ul className="space-y-3">
            {newPosts.map((p) => (
              <li key={p._id}>
                <Link to={`/post/${p._id}`} className="text-blue-600 hover:underline">
                  {p.title.length > 50 ? p.title.substring(0, 50) + "..." : p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Categories</h2>
          <ul className="space-y-3">
            {categories.map((c, idx) => (
              <li key={idx} className="text-gray-700">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
