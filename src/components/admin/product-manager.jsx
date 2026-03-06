import React, { useEffect, useState } from "react";
import ProductForm from "./product-form";

/**
 * ProductManager
 * Displays a list of products with the ability to add/edit/delete.
 */
const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Normally you'd fetch from API here:
    setProducts([
      { id: 1, name: "iPhone 14 Pro", price: 120000, stock: 10 },
      { id: 2, name: "Samsung Galaxy S24", price: 95000, stock: 15 },
    ]);
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSave = (product) => {
    if (product.id) {
      // Edit existing
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      // Add new
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Product Manager</h2>

      {showForm ? (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <button
            onClick={handleAdd}
            className="mb-4 px-4 py-2 bg-sky-600 text-white rounded-md"
          >
            Add Product
          </button>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price (KSH)</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.price}</td>
                  <td className="p-2 border">{product.stock}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEdit(product)}
                      className="mr-2 px-3 py-1 border rounded hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 border rounded text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductManager;
