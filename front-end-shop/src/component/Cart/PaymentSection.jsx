import { useNavigate } from "react-router-dom";

const PaymentSection = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/"); // Điều hướng về trang chủ ("/")
  };

  return (
    <div>
      <h2 className="font-bold">Thông tin đơn hàng</h2>
      <div className="text-gray-800 mt-8 space-y-4">
        <div className="flex flex-wrap gap-4 text-base">
          Tổng tiền<span className="ml-auto font-bold">
            {(0).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
          </span>
        </div>
        <hr />
        <div className="flex flex-wrap gap-4 text-base">
          Tổng khuyến mãi{" "}
          <span className="ml-auto font-bold">
            {(2).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
          </span>
        </div>
        <hr />
        <div className="flex flex-wrap gap-4 text-base font-bold">
          Cần thanh toán{" "}
          <span className="ml-auto">
            {(52).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
          </span>
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <button
          type="button"
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Xác nhận đơn hàng
        </button>
        <button
          onClick={handleContinueShopping}
          type="button"
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default PaymentSection;
