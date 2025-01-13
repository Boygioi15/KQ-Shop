import { useState } from "react";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
const PaymentMethod = ({ selectedPayment, setSelectedPayment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle selecting a payment method
  const handlePaymentSelect = (method) => {
    setSelectedPayment(method); // Set the selected payment method
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">Chọn phương thức thanh toán</h3>

      {/* Payment options */}
      <div className="mt-4">
        <div
          className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 mb-3"
          onClick={() => handlePaymentSelect("credit-card")}
        >
          <FaMoneyBillWaveAlt className="w-6 h-6 text-gray-600" />
          <span className="ml-3 text-gray-800">Thẻ tín dụng / Thẻ ghi nợ</span>
        </div>

        <div
          className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 mb-3"
          onClick={() => handlePaymentSelect("paypal")}
        >
          <FaMoneyBillWaveAlt className="w-6 h-6 text-gray-600" />
          <span className="ml-3 text-gray-800">PayPal</span>
        </div>

        <div
          className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 mb-3"
          onClick={() => handlePaymentSelect("cod")}
        >
          <FaMoneyBillWaveAlt className="w-6 h-6 text-gray-600" />
          <span className="ml-3 text-gray-800">Thanh toán khi nhận hàng (COD)</span>
        </div>
      </div>

      {/* Display selected payment method */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-700">Phương thức thanh toán đã chọn:</h4>
        <span className="text-gray-800">{selectedPayment}</span>
      </div>

      {/* Modal for payment confirmation (Optional) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">
              Xác nhận phương thức thanh toán
            </h3>
            <p className="text-sm text-gray-600 my-4">
              Bạn có chắc chắn muốn sử dụng phương thức thanh toán này không?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setIsModalOpen(false)}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
