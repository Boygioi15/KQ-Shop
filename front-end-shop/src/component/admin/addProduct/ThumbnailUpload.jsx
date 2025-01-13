import React from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import { getImageLink } from "../../../config/api";

const ThumbnailUpload = ({ productData, setProductData }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Lấy file từ input
    if (file) {
      console.log(
        "🚀 ~ handleFileChange ~ productData.thumb:",
        productData.thumb
      );
      const formData = new FormData();
      formData.append("image", file); 

      try {
        const response = await getImageLink(formData);
        console.log("🚀 ~ handleFileChange ~ response:", response);
        // Cập nhật thông tin ảnh vào productData
        setProductData({
          ...productData,
          thumb: response.imageUrl,
        });
      } catch (error) {
        console.error("Lỗi khi tải hình ảnh lên:", error);
      }

      // Reset input file để có thể upload lại cùng một file
      e.target.value = null;
    }
  };

  const handleRemoveImage = () => {
    setProductData({
      ...productData,
      thumb: null, // Xóa đường dẫn ảnh hiện tại
    });
  };

  return (
    <div className="w-full h-auto">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold mb-4">Ảnh sản phẩm</h2>
        {productData.thumb && (
          <button
            onClick={handleRemoveImage}
            className=" bg-red-500 text-white rounded-full p-2 hover:bg-red-600 w-8 h-8"
          >
            <FaTrash />
          </button>
        )}
      </div>
      <label
        htmlFor="uploadFile1"
        className={`bg-white text-gray-500 font-semibold text-base rounded h-auto flex flex-col items-center 
        justify-center cursor-pointer ${
          productData.thumb ? "" : "border-2 border-mainColor border-dashed"
        } 
        mx-auto font-[sans-serif]`}
      >
        {productData.thumb ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={productData.thumb}
              alt="Thumbnail Preview"
              className="max-w-full max-h-full object-contain transform scale-200"
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
          id="uploadFile1"
          name="thumbnail"
          accept="image/*"
          onChange={handleFileChange} // Khi chọn file, gọi handleFileChange
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ThumbnailUpload;
