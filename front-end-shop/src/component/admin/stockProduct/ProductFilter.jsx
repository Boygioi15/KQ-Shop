import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { TiArrowSortedDown } from "react-icons/ti";

const ProductFilter = ({ filters, setFilters }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 mb-6">
      <div className="relative">
        <select
          value={filters.stockStatus}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, stockStatus: e.target.value }))
          }
          className="appearance-none w-full border px-4 py-2 rounded-lg pr-10"
        >
          <option value="">Stock Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <TiArrowSortedDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          className="appearance-none w-full border px-4 py-2 rounded-lg pr-10"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food & Drinks</option>
        </select>
        <TiArrowSortedDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default ProductFilter;
