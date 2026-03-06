// BundleItems (export default)
// file: frontend/src/components/product/bundle-items.jsx
// ---------------------------------------------------------------------------
import React from "react";


/**
* BundleItems
* Displays a list of bundle components for the product and allows toggling them.
* Props:
* - items: Array of { id, title, price, image }
* - selected: array of ids (optional)
* - onChange: (selectedIds) => {}
*/
export const BundleItems = ({ items = [], selected = [], onChange }) => {
const toggle = (id) => {
const exists = selected.includes(id);
const next = exists ? selected.filter((x) => x !== id) : [...selected, id];
onChange?.(next);
};


if (!items || items.length === 0) return null;


return (
<div className="mt-6 border rounded-md p-4">
<h4 className="text-md font-semibold mb-3">Bundle & Add-ons</h4>
<div className="flex flex-col gap-3">
{items.map((it) => {
const sel = selected.includes(it.id);
return (
<label key={it.id} className="flex items-center gap-3 cursor-pointer">
<input type="checkbox" checked={sel} onChange={() => toggle(it.id)} />
<div className="flex items-center gap-3">
<div className="w-16 h-12 bg-white rounded overflow-hidden flex items-center justify-center">
{it.image ? (
<img src={it.image} alt={it.title} className="object-contain w-full h-full" />
) : (
<div className="text-xs text-gray-400">No image</div>
)}
</div>
<div>
<div className="text-sm font-medium">{it.title}</div>
<div className="text-sm text-gray-600">KSH {Number(it.price || 0).toFixed(2)}</div>
</div>
</div>
</label>
);
})}
</div>
</div>
);
};


export default BundleItems;