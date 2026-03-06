import React, { useState, useMemo } from "react";

/**
 * ProductVariationSelector
 * A lightweight, dependency-free variation selector for product pages.
 *
 * Props:
 *  - variations: array of variation groups, e.g.
 *      [ { name: 'Color', key: 'color', options: [{ id: 'red', label: 'Red', image: '/img/red.png' }, ...] },
 *        { name: 'Size', key: 'size', options: [{ id: 's', label: 'S' }, ...] } ]
 *  - price: base price (number)
 *  - onChange: (selected) => {} called when selection changes
 *  - onAddToCart: (payload) => {} optional — called when Add to Cart pressed
 *  - initial: object of initial selections e.g. { color: 'red', size: 'm' }
 *
 * Returns selected object and renders simple UI controls.
 */

const OptionButton = ({ selected, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1 rounded-md border focus:outline-none text-sm ${
      selected ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

const ProductVariationSelector = ({ variations = [], price = 0, onChange, onAddToCart, initial = {} }) => {
  const initialSelection = useMemo(() => {
    const sel = {};
    variations.forEach((v) => {
      sel[v.key] = initial[v.key] ?? (v.options && v.options.length ? v.options[0].id : null);
    });
    return sel;
  }, [variations, initial]);

  const [selection, setSelection] = useState(initialSelection);
  const [quantity, setQuantity] = useState(1);

  const handleSelect = (key, optionId) => {
    const next = { ...selection, [key]: optionId };
    setSelection(next);
    onChange?.(next);
  };

  // compute a simple price (base + sum of selected option modifiers if present)
  const computedPrice = useMemo(() => {
    let p = Number(price || 0);
    variations.forEach((v) => {
      const opt = v.options?.find((o) => String(o.id) === String(selection[v.key]));
      if (opt && opt.priceModifier) p += Number(opt.priceModifier);
    });
    return p * Number(quantity || 1);
  }, [price, variations, selection, quantity]);

  const handleAddToCart = () => {
    const payload = { selection, quantity, unitPrice: computedPrice / quantity };
    onAddToCart?.(payload);
  };

  return (
    <div className="w-full">
      {variations.map((v) => (
        <div key={v.key} className="mb-4">
          <div className="mb-2 text-sm font-medium text-gray-700">{v.name}</div>
          <div className="flex flex-wrap gap-2">
            {v.options?.map((opt) => (
              <OptionButton
                key={opt.id}
                selected={String(selection[v.key]) === String(opt.id)}
                onClick={() => handleSelect(v.key, opt.id)}
              >
                {opt.image ? (
                  <span className="flex items-center gap-2">
                    <img src={opt.image} alt={opt.label} className="w-6 h-6 rounded-sm object-cover" />
                    <span>{opt.label}</span>
                  </span>
                ) : (
                  <span>{opt.label}</span>
                )}
              </OptionButton>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded-md"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
            className="w-16 text-center border rounded-md px-2 py-1"
            min={1}
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 border rounded-md"
          >
            +
          </button>
        </div>

        <div className="ml-auto text-lg font-semibold">{isNaN(computedPrice) ? "-" : `KSH ${computedPrice.toFixed(2)}`}</div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="px-4 py-2 rounded-md bg-sky-600 text-white font-medium hover:opacity-95"
        >
          Add to cart
        </button>
        <button type="button" className="px-4 py-2 rounded-md border">
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductVariationSelector;
