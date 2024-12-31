import React from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../../../component/Product/ProductItem";

const ProductPage = () => {
  const { productType } = useParams(); // Lấy loại sản phẩm từ URL

  // Tạo một tiêu đề tương ứng với loại sản phẩm
  const getProductTitle = (type) => {
    switch (type) {
      case "iphone":
        return "iPhone Products";
      case "mac":
        return "Mac Products";
      case "ipad":
        return "iPad Products";
      case "apple-watch":
        return "Apple Watch Products";
      case "audio":
        return "Audio Products (Headphones, Speakers)";
      case "accessories":
        return "Accessories";
      default:
        return "Products";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        {getProductTitle(productType)}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ProductItem productType={productType} isEdit={true}/>
        <ProductItem productType={productType} />
        <ProductItem productType={productType} />
        <ProductItem productType={productType} />{" "}
        {/* Truyền loại sản phẩm vào ProductItem */}
        <ProductItem productType={productType} />
        <ProductItem productType={productType} />
      </div>
    </div>
  );
};

export default ProductPage;
