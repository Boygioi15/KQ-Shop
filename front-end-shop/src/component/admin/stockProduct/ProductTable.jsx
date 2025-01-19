import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { formatVND } from "../../../utils/format";
import React, { useState, useEffect } from "react";
import { getCategoryById } from "../../../config/api";
import { VscDebugPause, VscDebugContinue  } from "react-icons/vsc";

const ProductTable = ({ products }) => {
  const [categoryNames, setCategoryNames] = useState({});
  const [failedCategories, setFailedCategories] = useState(new Set());

  useEffect(() => {
    const loadCategories = async () => {
      const uniqueCategories = [...new Set(products.map(p => p.categoryRef))];
      
      try {
        const results = await Promise.all(
          uniqueCategories.map(async (catId) => {
            try {
              // Add 5 second timeout
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 5000);
              
              const response = await getCategoryById(catId);
              clearTimeout(timeoutId);
              
              return { id: catId, name: response.data.name, success: true };
            } catch (err) {
              setFailedCategories(prev => new Set([...prev, catId]));
              return { id: catId, name: 'Unknown Category', success: false };
            }
          })
        );
        
        const categoryMap = results.reduce((acc, { id, name }) => {
          acc[id] = name;
          return acc;
        }, {});
        
        setCategoryNames(categoryMap);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    if (products.length > 0) {
      loadCategories();
    }
  }, [products]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB").format(date);
  };

  return (
    <div className="hidden md:block">
      <table className="w-full bg-white table-auto shadow-md rounded-lg">
        <thead className="rounded-t-lg">
          <tr className="bg-white">
            <th className="p-5 text-left rounded-full">Hình ảnh</th>
            <th className="p-5 text-left">Tên sản phẩm</th>
            <th className="p-5 text-left">Tổng kho hàng</th>
            <th className="p-5 text-left">Giá hiển thị</th>
            <th className="p-5 text-left">Danh mục</th>
            <th className="p-5 text-left">Màu sắc</th>
            <th className="p-5 text-left">Kích thước</th>
            <th className="p-5 text-left">Trạng thái</th>
            <th className="p-5 text-center rounded-full">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="p-5 border-b">
                <img
                  src={product.init_ThumbnailURL || "https://via.placeholder.com/50"}
                  className="h-10 w-10 rounded"
                  style={{objectFit:"cover"}}
                  alt={product.name}
                />
              </td>
              <td className="p-5 border-b text-mainColor font-semibold">
                {product.name}
              </td>
              <td className="p-5 border-b">
                {product.types.reduce((total, type) => 
                  total + type.details.reduce((sum, detail) => sum + detail.inStorage, 0)
                , 0)}
              </td>
              <td className="p-5 border-b">
                {formatVND(product.types[0]?.details[0]?.price || 0)}
              </td>
              <td className="p-5 border-b text-mainColor">
                {failedCategories.has(product.categoryRef) 
                  ? 'Failed to load'
                  : (categoryNames[product.categoryRef] || 'Loading...')}
              </td>
              <td className="p-5 border-b">
                {product.types.map(type => type.color_name).join(", ")}
              </td>
              <td className="p-5 border-b">
                {product.types[0]?.details.map(detail => detail.size_name).join(", ")}
              </td>
              <td className="p-5 border-b">
                {product.isPublished? ("Đang bán") : "Đã tạm ngưng"}
              </td>
              <td className="p-5 border-b text-center">
                <div className="flex justify-center items-center gap-x-2">
                  <AiOutlineEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                  <AiOutlineDelete className="text-red-500 cursor-pointer hover:text-red-700" />
                  {product.isPublished?
                    <VscDebugPause className="text-yellow-500 cursor-pointer hover:text-blue-700"/> : 
                    <VscDebugContinue className="text-green-500 cursor-pointer hover:text-blue-700"/>
                  }
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
