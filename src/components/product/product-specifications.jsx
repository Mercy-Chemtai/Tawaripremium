import React from "react";

/**
 * ProductSpecifications component
 * Displays product specifications in a responsive table format.
 *
 * Props:
 *  - specifications: an object or array of key/value pairs
 *  - title (optional): section title
 *
 * Example:
 *  <ProductSpecifications
 *    title="Specifications"
 *    specifications={{
 *      Brand: "Apple",
 *      Model: "MacBook Air M2",
 *      Processor: "Apple M2 chip",
 *      RAM: "8 GB",
 *      Storage: "256 GB SSD",
 *      Display: "13.6-inch Liquid Retina",
 *    }}
 *  />
 */

const ProductSpecifications = ({ specifications = {}, title = "Specifications" }) => {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  // Support arrays too
  const specsArray = Array.isArray(specifications)
    ? specifications
    : Object.entries(specifications).map(([key, value]) => ({ key, value }));

  return (
    <div className="w-full mt-6">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left border-collapse">
          <tbody>
            {specsArray.map((spec, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                } border-b`}
              >
                <th className="py-2 px-4 font-medium w-1/3 text-gray-700 dark:text-gray-300">
                  {spec.key}
                </th>
                <td className="py-2 px-4 text-gray-600 dark:text-gray-400">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSpecifications;
