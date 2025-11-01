import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/cart/CartContext";
import { Plus, Minus, Trash } from "lucide-react";

export default function CartPage() {
  const { items, updateItem, removeItem, clear, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
        <Link to="/shop" className="inline-block bg-black text-white px-4 py-2 rounded">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shopping Cart ({totalItems} items)</h1>
        <div className="space-x-2">
          <button onClick={() => clear()} className="text-sm text-red-600 hover:underline">Clear cart</button>
          <button onClick={() => navigate("/shop")} className="text-sm text-gray-600 hover:underline">Continue shopping</button>
        </div>
      </div>

      <div className="grid gap-6">
        {items.map((it) => (
          <div key={it.product_id ?? it.id} className="flex gap-4 items-center bg-white p-4 rounded shadow">
            <div className="h-28 w-28 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
              <img
                src={it.image || "/placeholder.svg?height=120&width=120"}
                alt={it.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder.svg?height=120&width=120"; }}
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <Link to={`/shop/${it.slug ?? ""}`} className="text-lg font-medium text-gray-800 hover:underline">{it.name}</Link>
                  <div className="text-sm text-gray-500">KSh{(it.price).toLocaleString()}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500">Line total</div>
                  <div className="font-semibold">KSh{(it.price * it.quantity).toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center border rounded">
                  <button onClick={() => updateItem(it.product_id ?? it.id, { quantity: Math.max(1, (it.quantity || 1) - 1) })} className="px-3 py-2">
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="px-4 py-2 min-w-[48px] text-center">{it.quantity}</div>
                  <button onClick={() => updateItem(it.product_id ?? it.id, { quantity: (it.quantity || 1) + 1 })} className="px-3 py-2">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button onClick={() => removeItem(it.product_id ?? it.id)} className="text-red-600 hover:underline flex items-center gap-2">
                  <Trash className="h-4 w-4" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end items-center gap-6">
          <div className="text-right">
            <div className="text-sm text-gray-500">Subtotal</div>
            <div className="text-2xl font-bold">KSh{subtotal.toLocaleString()}</div>
          </div>

          <button onClick={() => navigate("/checkout")} className="bg-black text-white px-6 py-3 rounded">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
