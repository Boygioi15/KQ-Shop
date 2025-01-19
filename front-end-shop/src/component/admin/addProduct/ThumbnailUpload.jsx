import React, { useState } from "react";
import { FaUpload, FaTrash, FaSpinner } from "react-icons/fa";
import { getImageLink } from "../../../config/api";

const ThumbnailUpload = ({ productData, setProductData, fieldName }) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const getFieldLabel = () => {
    if (fieldName === "init_ThumbnailURL") return "Ảnh sản phẩm";
    if (fieldName === "hover_ThumbnailURL") return "Ảnh nổi bật";
    return "Ảnh sản phẩm";
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Lấy file từ input
    if (file) {
      console.log(
        `🚀 ~ handleFileChange ~ productData.${fieldName}:`,
        productData[fieldName]
      );
      const formData = new FormData();
      formData.append("image", file); 
      setIsUploading(true);

      try {
        const response = await getImageLink(formData);
        console.log(`🚀 ~ handleFileChange ~ response for ${fieldName}:`, response);
        // Cập nhật thông tin ảnh vào productData
        setProductData({
          ...productData,
          [fieldName]: response.data.imageUrl,
        });
      } catch (error) {
        console.error(`Lỗi khi tải hình ảnh lên cho ${fieldName}:`, error);
      }

      // Reset input file để có thể upload lại cùng một file
      setIsUploading(false);
      e.target.value = null;
    }
  };

  const handleRemoveImage = () => {
    setProductData({
      ...productData,
      [fieldName]: null, // Xóa đường dẫn ảnh hiện tại
    });
  };

  return (
    <div className="w-full h-auto">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold mb-4">{getFieldLabel()}</h2>
        {productData[fieldName] && (
          <button
            onClick={handleRemoveImage}
            className=" bg-red-500 text-white rounded-full p-2 hover:bg-red-600 w-8 h-8"
          >
            <FaTrash />
          </button>
        )}
      </div>
      <label
        htmlFor={`uploadFile-${fieldName}`}
        className={`bg-white text-gray-500 font-semibold text-base rounded h-auto flex flex-col items-center 
        justify-center cursor-pointer ${
          productData[fieldName] ? "" : "border-2 border-mainColor border-dashed"
        } 
        mx-auto font-[sans-serif]`}
      >
        {isUploading ? (
          <div className="flex flex-col justify-center items-center p-20">
            <FaSpinner className="w-11 mb-2 text-mainColor animate-spin" />
            <p>Uploading...</p>
          </div>
        ) : productData[fieldName] ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={productData[fieldName]}
              alt={`Thumbnail Preview ${fieldName}`}
              className="max-w-xs max-h-60 object-contain" // Added size constraints
            />
          </div>
        ) : (
          <div className="flex flex-col text-mainColor justify-center items-center p-20">
            <FaUpload className="w-11 mb-2 text-mainColor" />
            Upload file
          </div>
        )}
        <input
          type="file"
          id={`uploadFile-${fieldName}`}
          name={fieldName}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ThumbnailUpload;
