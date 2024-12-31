import { FaBitcoin } from "react-icons/fa";

const ProductPrice = ({ price, discountPrice, points }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center">
        {/* Price Section */}
        <div className="flex flex-col mr-4">
          <div className="grid grid-cols-3 justify-center">
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Mua ngay với giá</span>
              <span className="text-2xl font-bold text-gray-800">
                {price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 line-through">
                  {discountPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
                <span className="text-sm text-red-600 ml-2">-7%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start mt-2 bg-[#fffbe5] rounded-full px-3 py-2 w-max">
            <FaBitcoin />
            <span className="ml-1 text-sm font-bold text-gray-600">
              +{points} Điểm thưởng
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;
