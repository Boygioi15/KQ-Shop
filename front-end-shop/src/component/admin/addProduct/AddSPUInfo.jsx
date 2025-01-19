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
           
          <div className="mb-4">
            <label
              htmlFor="isPublished"
              className="block text-gray-700 font-medium mb-2"
            >
              Đăng bán
            </label>
            <select
              id="isPublished"
              name="isPublished"
              value={String(productData.isPublished)}
              onChange={(e) => {
                handleChange({
                  target: {
                    name: 'isPublished',
                    value: e.target.value === 'true'
                  }
                });
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </div>
        </form>

        <div>
          {/* ThumbnailUpload: Upload ảnh thumbnail đầu tiên */}
          <ThumbnailUpload
            productData={productData}
            setProductData={setProductData}
            fieldName="init_thumbnailURL"
          />

          {/* ThumbnailUpload: Upload ảnh thumbnail thứ hai (Hover Image) */}
          <ThumbnailUpload
            productData={productData}
            setProductData={setProductData}
            fieldName="hover_thumbnailURL"
          />
        </div>
      </div>
    </div>
  );
};

export default AddSPUInfo;
