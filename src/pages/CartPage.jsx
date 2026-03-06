import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/cart/CartContext";
import { Plus, Minus, X, ShoppingCart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart, getSubTotal, getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const totalItems = getTotalItems();
  const totalWithTax = Math.round(getSubTotal());

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
        <div className="text-center py-20">
          <div className="mb-6">
            <ShoppingCart className="h-16 w-16 sm:h-24 sm:w-24 mx-auto text-gray-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 text-sm sm:text-base">
            Looks like you haven't added any items yet.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-800 transition text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <div className="container mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              Shopping Cart
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => clearCart()}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cart.map((item, idx) => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedStorage}-${idx}`}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition"
              >
                <div className="flex gap-3 sm:gap-6">
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.slug}`}
                    className="h-20 w-20 sm:h-32 sm:w-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden hover:opacity-75 transition"
                  >
                    <img
                      src={item.primary_image?.image || item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-start mb-1 sm:mb-2 gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.slug}`}
                          className="text-sm sm:text-lg font-semibold text-gray-900 hover:text-gray-600 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {item.category_name || item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600 transition flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>

                    {/* Selected Options */}
                    {(item.selectedColor || item.selectedStorage) && (
                      <div className="flex flex-wrap gap-2 sm:gap-4 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-600">
                        {item.selectedColor && (
                          <span>
                            Color:{" "}
                            <span className="font-medium">{item.selectedColor}</span>
                          </span>
                        )}
                        {item.selectedStorage && (
                          <span>
                            Storage:{" "}
                            <span className="font-medium">{item.selectedStorage}</span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-auto gap-2">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-50 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <div className="px-2 sm:px-4 py-1.5 sm:py-2 min-w-[36px] sm:min-w-[50px] text-center font-medium text-sm sm:text-base">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-50 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs sm:text-sm text-gray-500">
                          KSh {Number(item.sale_price || item.price).toLocaleString()} each
                        </div>
                        <div className="text-base sm:text-xl font-bold text-gray-900">
                          KSh {(Number(item.sale_price || item.price) * item.quantity).toLocaleString()}
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
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>KSh {totalWithTax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span>KSh {totalWithTax.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400 text-right">
                  Tax (16% VAT) included in price
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(
                    isAuthenticated ? "/checkout" : "/login?redirect=/checkout"
                  )
                }
                className="w-full bg-black text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-800 transition mb-4 text-sm sm:text-base"
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