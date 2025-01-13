// src/component/admin/addproduct/ProductForm.js

import React from "react";
import AddProductForm from "./AddProductForm";
import CategorySelect from "./CategorySelect";
import ThumbnailUpload from "./ThumbnailUpload";

const AddSPUInfo = ({
  productData,
  handleChange,
  setProductData,
  handleSubmit,
}) => {
  return (
    <div className="flex w-full justify-center items-center bg-white rounded-lg shadow-md p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
        <form onSubmit={handleSubmit} className="w-full pr-4 space-y-5">
          <h2 className="text-xl font-bold mb-4">Thông tin sản phẩm</h2>

          {/* AddProductForm: Nhập tên và mô tả sản phẩm */}
          <AddProductForm
            productData={productData}
            handleChange={handleChange}
          />

          {/* CategorySelect: Chọn danh mục sản phẩm */}
          <CategorySelect
            productData={productData}
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Thêm sản phẩm
          </button>
        </form>

        {/* ThumbnailUpload: Upload ảnh thumbnail */}
        <ThumbnailUpload
          productData={productData}
          setProductData={setProductData}
        />
      </div>
    </div>
  );
};

export default AddSPUInfo;
