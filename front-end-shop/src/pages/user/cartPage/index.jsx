import React, { useEffect, useState } from "react";
import { getCartItemList } from "../../../config/api";
import { useSelector } from "react-redux";
import CartEmpty from "../../../component/Cart/CartEmpty";
import CartItem from "../../../component/Cart/CartItem";
import CheckOut from "../../../component/Cart/CheckOut";
import CheckoutInfo from "../../../component/Cart/CheckoutInfo"; // Import CheckoutInfo
import { IoIosArrowBack } from "react-icons/io";
import PaymentMethod from "../../../component/Cart/PaymentMethod";

const CartPage = () => {
  const userId = useSelector((state) => state.account?.user?._id);
  const [cartItems, setCartItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCheckout, setIsCheckout] = useState(false); // Trạng thái thanh toán
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const getShowCart = async () => {
      try {
        setLoading(true);
        const response = await getCartItemList(userId);
        if (response.status === 200) {
          setCartItems(response.metadata);
        } else {
          throw new Error("Failed to fetch cart items");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getShowCart();
  }, [userId]);

  const handleCheckout = (formData) => {
    console.log("Thông tin thanh toán:", formData);
    // Gửi thông tin thanh toán lên server
    setIsCheckout(false); // Quay lại trạng thái giỏ hàng sau khi thanh toán xong
  };

  return (
    <div className="py-4">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4 relative">
          <div className="md:col-span-2">
            <div className=" p-4 flex flex-col gap-4 bg-white rounded-md overflow-y-auto">
              {isCheckout && (
                <a
                  onClick={() => setIsCheckout(false)}
                  className="text-mainColor flex flex-row items-center cursor-pointer"
                >
                  <IoIosArrowBack />
                  Quay lại giỏ hàng
                </a>
              )}
              <div className="space-y-4 ">
                {cartItems.map((cartItem) => (
                  <CartItem
                    key={cartItem.skuId}
                    cartItem={cartItem}
                    setSelectedProducts={setSelectedProducts}
                    setCartItems={setCartItems}
                    isCheckout={isCheckout}
                  />
                ))}
              </div>
            </div>
            {/* Hiển thị CheckoutInfo ngay dưới CheckOut nếu đang trong trạng thái thanh toán */}
            {isCheckout && (
              <>
                <div className="mt-4 ">
                  <CheckoutInfo
                    onSubmit={handleCheckout} // Xác nhận thanh toán
                  />
                </div>
                <div className="mt-4 ">
                  <PaymentMethod
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                  />
                </div>
              </>
            )}
          </div>

          {/* Hiển thị CheckOut */}
          {cartItems.length > 0 && (
            <CheckOut
              products_order={selectedProducts}
              userId={userId}
              onCheckout={() => setIsCheckout(true)} // Start the checkout process
              onContinueShopping={() => setIsCheckout(false)} // Go back to the cart
              isCheckout={isCheckout} // Pass the checkout state to toggle button text
            />
          )}
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
};

export default CartPage;
