import { useState, useEffect } from "react";
import { blogAPI } from "../services/api";

export default function BlogAdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogAPI.adminList();
      setPosts(data);
    } catch (err) {
      setError("Could not load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await blogAPI.adminDelete(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  const handleSaved = () => {
    setEditingPost(null);
    setCreatingNew(false);
    loadPosts();
  };

  if (editingPost || creatingNew) {
    return (
      <BlogPostForm
        post={editingPost}
        onCancel={() => {
          setEditingPost(null);
          setCreatingNew(false);
        }}
        onSaved={handleSaved}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <button
          onClick={() => setCreatingNew(true)}
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          + New Post
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading posts…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-500">No posts yet. Click "New Post" to write your first one.</p>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-4 min-w-0">
              {post.featured_image && (
                <img
                  src={post.featured_image}
                  alt=""
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate">{post.title}</p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status}
                  </span>
                  {post.category_name && <span>{post.category_name}</span>}
                  <span>
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString()
                      : "Not published"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setEditingPost(post)}
                className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id, post.title)}
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}