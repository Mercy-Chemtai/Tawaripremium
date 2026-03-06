import React, { useState, useEffect } from "react";

/**
 * ProductForm
 * Handles adding/editing products.
 */
const ProductForm = ({ product, onSave, onCancel }) => {
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-md bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3">
        {form.id ? "Edit Product" : "Add Product"}
      </h3>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border rounded w-full px-2 py-1"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Price (KSH)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border rounded w-full px-2 py-1"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Stock</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="border rounded w-full px-2 py-1"
          required
        />
      </div>

      <div className="flex gap-3 mt-4">
        <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
