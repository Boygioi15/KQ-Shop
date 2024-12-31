import React, { useState, useRef, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";

const ProductDescription = ({ description, onClickThongSo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const paragraphRef = useRef(null);

  const maxLines = 5; // Số dòng tối đa bạn muốn hiển thị

  useEffect(() => {
    const checkNumberOfLines = () => {
      if (paragraphRef.current) {
        const lineHeight = parseInt(
          window.getComputedStyle(paragraphRef.current).lineHeight,
          10
        );
        const totalHeight = paragraphRef.current.scrollHeight;
        const lines = Math.floor(totalHeight / lineHeight);
        setShouldShowMore(lines > maxLines); // Hiển thị "Xem thêm" nếu số dòng vượt quá maxLines
      }
    };

    checkNumberOfLines(); // Kiểm tra số dòng ngay khi component render
    window.addEventListener("resize", checkNumberOfLines); // Cập nhật khi thay đổi kích thước cửa sổ

    return () => {
      window.removeEventListener("resize", checkNumberOfLines); // Clean up listener
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mt-16 bg-white border-2 rounded-lg p-6 space-y-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
          Thông tin sản phẩm
        </h1>
        <a
          className="text-mainColor cursor-pointer flex items-center hover:text-blue-900"
          onClick={onClickThongSo}
        >
          <span className="text-sm md:text-base font-medium">
            Thông số kỹ thuật
          </span>
          <MdNavigateNext className="text-xl" />
        </a>
      </div>

      <div
        className={`relative overflow-hidden ${
          !isExpanded ? "max-h-[20rem]" : ""
        }`} // Giới hạn chiều cao
      >
        <div
          ref={paragraphRef}
          dangerouslySetInnerHTML={{ __html: description }}
          className="prose max-w-none" // Add this if you're using Tailwind Typography
        />

        {/* Lớp phủ mờ đục nằm ngay dưới */}
        {!isExpanded && shouldShowMore && (
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent opacity-90 z-10 flex justify-center items-center">
            {/* Nút xem thêm nằm trên lớp phủ */}
            <button
              className="text-blue-500 bg-white font-bold hover:underline border border-gray-300 rounded-full px-4 py-2 mt-5"
              onClick={toggleExpand}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>

      {/* Nút thu gọn khi mở rộng */}
      {isExpanded && shouldShowMore && (
        <div className="flex justify-center mt-4">
          <button
            className="text-blue-500 font-bold hover:underline border border-gray-300 rounded-full px-4 py-2"
            onClick={toggleExpand}
          >
            Thu gọn
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
