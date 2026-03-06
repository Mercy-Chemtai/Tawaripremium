import React from "react";
import { useCart } from "./CartContext";
import { ShoppingCart } from "lucide-react";

export default function CartBadge({ className = "" }) {
  const { getTotalItems } = useCart();

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <ShoppingCart className="h-5 w-5" />
      <span className="text-sm font-medium">{getTotalItems()}</span>
    </div>
  );
}
