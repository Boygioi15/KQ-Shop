import {
  AiOutlineEye,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineEdit, // Thêm icon edit
} from "react-icons/ai";
import { FaTruck, FaTag } from "react-icons/fa";
import { useState } from "react";
import { ROUTERS } from "../../utils/router"; // Đảm bảo đường dẫn đúng
import { formatVND } from "../../utils/format";
import { Link } from "react-router-dom";

const ProductItem = ({ product, isEdit }) => {
  if (!product) {
    return (
      <div className="p-6 text-center text-gray-500">Product not available</div>
    );
  }

  const { id, imageSrc, link, name, productPrice } = product;

  const [showTooltipFavorites, setShowTooltipFavorites] = useState(false);
  const [showTooltipQuickLook, setShowTooltipQuickLook] = useState(false);

  // Hàm xử lý khi cố gắng nhấn vào link khi ở chế độ edit
  const handleLinkClick = (e) => {
    if (isEdit) {
      e.preventDefault(); // Ngừng việc bấm link khi ở trạng thái chỉnh sửa
    }
  };

  const calculateDiscount = () => {
    const { priceAfterDiscount, orignalPrice } = productPrice;
    const discount = ((orignalPrice - priceAfterDiscount) / orignalPrice) * 100;
    return Math.round(discount * 100) / 100;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm relative flex flex-col">
      <div className="h-56 w-full">
        <a
          href={ROUTERS.USER.PRODUCT_DETAIL(id)}
          onClick={handleLinkClick} // Ngăn việc bấm link khi ở trạng thái chỉnh sửa
          className={isEdit ? "cursor-default" : ""}
        >
          <img className="mx-auto h-full" src={imageSrc} alt="" />
        </a>
      </div>
      <div className="pt-6 flex-grow">
        <div className="mb-4 flex items-center justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              onMouseEnter={() => setShowTooltipQuickLook(true)}
              onMouseLeave={() => setShowTooltipQuickLook(false)}
            >
              <span className="sr-only">Quick look</span>
              <AiOutlineEye className="h-5 w-5" />
              {showTooltipQuickLook && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
                  Quick look
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
              )}
            </button>

            <button
              type="button"
              className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              onMouseEnter={() => setShowTooltipFavorites(true)}
              onMouseLeave={() => setShowTooltipFavorites(false)}
            >
              <span className="sr-only">Add to Favorites</span>
              <AiOutlineHeart className="h-5 w-5" />
              {showTooltipFavorites && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
                  Add to favorites
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Sử dụng thẻ <a> với href để điều hướng, thêm điều kiện không cho bấm link khi isEdit */}
        <Link
          to={link}
          className={`text-lg font-semibold leading-tight text-gray-900 ${
            isEdit ? "cursor-default" : "hover:underline"
          }`}
        >
          {name}
        </Link>

        <div className="mt-2 flex items-center gap-2">
          {/* Star Rating */}
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <AiFillStar key={index} className="h-4 w-4 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-900">5.0</p>
          <p className="text-sm font-medium text-gray-500">(455)</p>
        </div>

        <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2">
            <FaTruck className="h-4 w-4 text-gray-500" />
            <p className="text-sm font-medium text-gray-500">Fast Delivery</p>
          </li>
          <li className="flex items-center gap-2">
            <FaTag className="h-4 w-4 text-gray-500" />
            <p className="text-sm font-medium text-gray-500">Best Price</p>
          </li>
        </ul>

        {/* Điều kiện để hiển thị giá và nút "Add to cart" hay nút "Edit" */}
        {!isEdit &&
        productPrice.orignalPrice !== productPrice.priceAfterDiscount ? (
          <div className="mt-4 mb-5">
            <p className="text-sm text-slate-900">
              <span className="line-through">
                {formatVND(productPrice.orignalPrice)}
              </span>
              <span className="font-light underline">đ</span>{" "}
              <span className="text-red-600">-{calculateDiscount()}%</span>
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {formatVND(productPrice.priceAfterDiscount)}
              <span className="text-xl font-bold text-slate-900 underline"></span>
            </p>
          </div>
        ) : (
          <div className="mt-9 mb-5">
            <p className="text-sm text-slate-900"></p>
            <p className="text-2xl font-bold text-slate-900">
              {formatVND(productPrice.priceAfterDiscount)}
              <span className="text-xl font-bold text-slate-900 underline"></span>
            </p>
          </div>
        )}
      </div>

      {/* Nút Add to Cart hoặc Edit */}
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex items-center text-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 min-w-36"
        >
          {isEdit ? (
            <>
              <AiOutlineEdit className="h-5 w-5 mr-2" />
              Edit
            </>
          ) : (
            <>
              <AiOutlineShoppingCart className="h-5 w-5 mr-2" />
              Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
