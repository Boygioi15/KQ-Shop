// src/pages/ProductPage.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterSidebar from "../../../component/Product/FilterSidebar";
import ProductItem from "../../../component/Product/ProductItem";
import SortButton from "../../../component/Product/SortButton"; // Import SortButton
import { SortOptions } from "../../../component/Product/SortButton/sortOption"; // Import constants
import { getAllProductByCategory } from "../../../config/api";

const ProductPage = () => {
  const { categorySlug } = useParams(); // Lấy loại sản phẩm từ URL

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [sortedList, setSortedList] = useState([]); // State để lưu danh sách đã sắp xếp

  // Fetch list of products from the API
  const handleGetListProduct = async () => {
    const response = await getAllProductByCategory(categorySlug);

    if (response && response.status === 200) {
      const products = response.metadata.map((product) => ({
        id: product._id, // Hoặc _id, tùy theo cấu trúc của response
        name: product?.product_name,
        imageSrc: product?.product_thumb,
        productPrice: product?.product_price,
        link: `/products/${product?.product_slug}`, // Giả sử slug là một thuộc tính trong API
      }));

      setProductList(products); // Cập nhật state categoryList
      setSortedList(products); // Đặt danh sách ban đầu là sản phẩm chưa sắp xếp
    }
  };

  // Hàm xử lý sắp xếp danh sách sản phẩm
  const handleSortOptionSelect = (option) => {
    let sortedProducts = [...productList]; // Copy lại danh sách sản phẩm gốc

    switch (option) {
      case SortOptions.POPULARITY:
        sortedProducts = sortedProducts; // Không thay đổi gì nếu không có logic "Nổi bật"
        break;

      case SortOptions.PRICE_ASC:
        sortedProducts.sort(
          (a, b) =>
            a.productPrice.priceAfterDiscount -
            b.productPrice.priceAfterDiscount
        );
        break;

      case SortOptions.PRICE_DESC:
        sortedProducts.sort(
          (a, b) =>
            b.productPrice.priceAfterDiscount -
            a.productPrice.priceAfterDiscount
        );
        break;

      case SortOptions.NEWEST:
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      default:
        break;
    }

    setSortedList(sortedProducts);
    console.log(
      "🚀 ~ handleSortOptionSelect ~ sortedProducts:",
      sortedProducts
    ); // Cập nhật danh sách đã sắp xếp
  };

  // Hàm xử lý mở/đóng dropdown
  const toggleSortDropdown = () => {
    setIsSortDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    handleGetListProduct();
  }, [categorySlug]);

  return (
    <section className="bg-[#f3f4f6] antialiased">
      <div className="mx-auto max-w-screen-xl">
        {/* Main Content: Filters + Product List */}
        <div className="flex gap-6">
          <FilterSidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <div className="flex-1">
            {/* Sort Button */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {categorySlug}
              </h3>
              {/* Sử dụng SortButton component */}
              <SortButton
                isSortDropdownOpen={isSortDropdownOpen}
                toggleSortDropdown={toggleSortDropdown}
                handleSortOptionSelect={handleSortOptionSelect}
              />
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {/* Hiển thị các sản phẩm đã sắp xếp */}
              {sortedList.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  isEdit={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
