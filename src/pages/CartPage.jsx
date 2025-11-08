import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/cart/CartContext";
import { Plus, Minus, Trash, ShoppingCart, X } from "lucide-react";

export default function CartPage() {
  const { items, updateItem, removeItem, clear, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center py-20">
          <div className="mb-6">
            <ShoppingCart className="h-24 w-24 mx-auto text-gray-300" />
          </div>
          <h2 className="text-3xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any items yet.</p>
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const shipping = 0;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => clear()}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear cart
            </button>
            <Link
              to="/shop"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Continue shopping
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => (
              <div
                key={`${item.product_id}-${item.selectedColor}-${item.selectedStorage}-${idx}`}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.slug}`}
                    className="h-32 w-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden hover:opacity-75 transition"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link
                          to={`/product/${item.slug}`}
                          className="text-lg font-semibold text-gray-900 hover:text-gray-600"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="text-gray-400 hover:text-red-600 transition"
                        aria-label="Remove item"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Selected Options */}
                    {(item.selectedColor || item.selectedStorage) && (
                      <div className="flex gap-4 mb-3 text-sm text-gray-600">
                        {item.selectedColor && (
                          <span>
                            Color: <span className="font-medium">{item.selectedColor}</span>
                          </span>
                        )}
                        {item.selectedStorage && (
                          <span>
                            Storage: <span className="font-medium">{item.selectedStorage}</span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            updateItem(item.product_id, {
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          }
                          className="px-3 py-2 hover:bg-gray-50 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="px-4 py-2 min-w-[50px] text-center font-medium">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() =>
                            updateItem(item.product_id, {
                              quantity: item.quantity + 1,
                            })
                          }
                          className="px-3 py-2 hover:bg-gray-50 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          KSh {item.price.toLocaleString()} each
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>KSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (16%)</span>
                  <span>KSh {Math.round(tax).toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>KSh {Math.round(total).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition mb-4"
              >
                Proceed to Checkout
              </button>

              <div className="text-xs text-gray-500 text-center">
                Taxes calculated at checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}