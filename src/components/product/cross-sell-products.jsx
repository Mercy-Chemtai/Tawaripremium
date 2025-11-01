// ---------------------------------------------------------------------------
// CrossSellProducts (export default)
// file: frontend/src/components/product/cross-sell-products.jsx
// ---------------------------------------------------------------------------
import React from "react";


/**
* CrossSellProducts
* Lightweight component that renders a horizontal list of related products.
* Props:
* - products: Array of { id, title, price, image }
* - onSelect: (product) => {} optional, called when a product is clicked
*/
const CrossSellProducts = ({ products = [], onSelect }) => {
if (!products || products.length === 0) return null;


return (
<div className="mt-8">
<h3 className="text-lg font-semibold mb-3">You might also like</h3>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
{products.map((p) => (
<div
key={p.id}
className="border rounded-md p-3 cursor-pointer hover:shadow transition-shadow flex flex-col"
onClick={() => onSelect?.(p)}
>
<div className="w-full h-40 flex items-center justify-center overflow-hidden mb-3 bg-white rounded">
{p.image ? (
<img src={p.image} alt={p.title} className="object-contain w-full h-full" />
) : (
<div className="text-sm text-gray-400">No image</div>
)}
</div>
<div className="flex-1">
<div className="text-sm font-medium text-gray-800 mb-1">{p.title}</div>
<div className="text-sm text-gray-600">KSH {Number(p.price || 0).toFixed(2)}</div>
</div>
</div>
))}
</div>
</div>
);
};


export default CrossSellProducts;