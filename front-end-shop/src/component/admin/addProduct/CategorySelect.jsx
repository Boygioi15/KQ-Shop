import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../../config/api";

const CategorySelect = ({ productData, handleChange }) => {
  const [categoryList, setCategoryList] = useState([]);

  // Lấy danh mục sản phẩm khi component được mount
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
        const categories = await getAllCategory();
        console.log("🚀 ~ getCategory ~ categories:", categories);
        const categories_data = categories.data;
        if (Array.isArray(categories_data)) {
            const mappedCategories = categories_data.map((category) => ({
                id: category._id,
                name: category.name,
            }));
            setCategoryList(mappedCategories);
        } else {
            console.error("Unexpected response format:", categories);
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};
  return (
    <div className="mb-4">
      <label
        htmlFor="category"
        className="block text-gray-700 font-medium mb-2"
      >
        Danh mục
      </label>
      <select
        id="category"
        name="category"
        value={productData.category}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Chọn danh mục</option>
        {categoryList.map((category, index) => (
          <option key={index} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {productData.category === "Khác" && (
        <div className="mt-2">
          <label
            htmlFor="customCategory"
            className="block text-gray-700 font-medium mb-2"
          >
            Nhập category khác
          </label>
          <input
            type="text"
            id="customCategory"
            name="customCategory"
            value={productData.customCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập category mới"
          />
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
