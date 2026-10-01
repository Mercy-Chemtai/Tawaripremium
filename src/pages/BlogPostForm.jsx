import { useState } from "react";
import { blogAPI } from "../../services/api";

// Keep in sync with categories used in BlogPage.jsx so filters keep working.
const CATEGORY_OPTIONS = [
  "Repairs", "Sales", "Maintenance", "Data", "Apple Watch", "Wearables",
  "iPhone Tips", "iPhone Repair",
];

export default function BlogPostForm({ post, onCancel, onSaved }) {
  const isEditing = Boolean(post);

  const [title, setTitle] = useState(post?.title || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [categoryName, setCategoryName] = useState(post?.category_name || "");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(post?.featured_image || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e, publishNow) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await blogAPI.adminSave(
        post?.id,
        {
          title,
          excerpt,
          content,
          category_name: categoryName,
          status: publishNow ? "published" : "draft",
        },
        imageFile
      );
      onSaved();
    } catch (err) {
      setError(err.message || "Failed to save post. Please check your fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-800 mb-6">
        ← Back to all posts
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditing ? "Edit Post" : "New Post"}
      </h1>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">No category</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short summary <span className="text-gray-400 font-normal">(shown on the blog list)</span>
          </label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={300}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured image</label>
          {previewUrl && (
            <img src={previewUrl} alt="" className="w-full max-h-64 object-cover rounded-lg mb-3" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={14}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm"
            placeholder="HTML is fine — e.g. <h2>...</h2><p>...</p> — renders the same as your existing articles."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            disabled={saving}
            onClick={(e) => handleSubmit(e, false)}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={(e) => handleSubmit(e, true)}
            className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}