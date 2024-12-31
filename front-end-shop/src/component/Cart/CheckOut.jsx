import { useEffect, useState } from "react";
import { formatVND } from "../../utils/format";
import { getCheckout } from "../../config/api";

const initCheckOutValue = {
  accLoyalPoint: 0,
  feeShip: 0,
  productDiscount: 0,
  totalCheckOut: 0,
  totalPrice: 0,
  voucherDiscount: 0,
};

const CheckOut = ({
  products_order,
  userId,
  onCheckout,
  onContinueShopping,
  isCheckout,
}) => {
  const [checkoutValue, setCheckOutValue] = useState(initCheckOutValue);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const handleCheckOut = async () => {
      if (!products_order.length) {
        setCheckOutValue(initCheckOutValue);
        return;
      }
      try {
        const response = await getCheckout({ products_order, userId });
        if (response.status === 200) {
          setCheckOutValue(response.metadata.checkOut_order);
        }
      } catch (error) {
        console.error("Failed to fetch checkout data:", error.message);
      }
    };

    handleCheckOut();
  }, [products_order, userId]);

  const handleApplyPromoCode = () => {
    console.log("Applying promo code:", promoCode);
    // TODO: Call API to validate and apply the promo code
  };

  return (
    <div className="bg-white rounded-md p-4 md:self-start sticky top-0 shadow-md">
      <div className="flex border border-blue-600 overflow-hidden rounded-md">
        <input
          type="text"
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
        />
        <button
          type="button"
          onClick={handleApplyPromoCode}
          className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
        >
          Apply
        </button>
      </div>

      <ul className="text-gray-800 mt-8 space-y-4">
        <li className="flex justify-between text-base">
          Discount
          <span className="font-bold">
            {formatVND(checkoutValue.productDiscount)}
          </span>
        </li>
        <li className="flex justify-between text-base">
          Shipping
          <span className="font-bold">{formatVND(checkoutValue.feeShip)}</span>
        </li>
        <li className="flex justify-between text-base">
          Loyal Points
          <span className="font-bold">
            {formatVND(checkoutValue.accLoyalPoint)}
          </span>
        </li>
        <li className="flex justify-between text-base font-bold">
          Total
          <span>{formatVND(checkoutValue.totalCheckOut)}</span>
        </li>
      </ul>

      <div className="mt-8 space-y-2">
        <button
          type="button"
          onClick={onCheckout}
          disabled={products_order.length === 0}
          className={`text-sm px-4 py-2.5 w-full font-semibold tracking-wide rounded-md ${
            products_order.length === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isCheckout ? "Đặt hàng" : "Xác nhận đơn"}
        </button>
        <button
          type="button"
          onClick={onContinueShopping}
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
