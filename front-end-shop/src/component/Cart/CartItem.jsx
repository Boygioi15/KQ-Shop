import { useState } from "react";
import {
  RiDeleteBin6Line,
  RiSubtractFill,
  RiAddFill,
  RiArrowDownSLine,
} from "react-icons/ri"; // Import React Icons
import { deleteItemInCart, updateQuantity } from "../../config/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CartItem = ({
  cartItem,
  setSelectedProducts,
  setCartItems,
  isCheckout,
}) => {
  // Thêm isCheckout
  const product = {
    skuId: cartItem.skuId,
    name: cartItem.name,
    imageUrl: cartItem.thumb,
    price: cartItem.originalPrice,
    discountPrice: cartItem.priceAfterDiscount,
    loyalPoint: cartItem.loyalPoint,
    quantity: cartItem.quantity,
  };

  const [quantity, setQuantity] = useState(product.quantity);
  const [selectedColor, setSelectedColor] = useState("256 GB");
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useSelector((state) => state.account?.user?._id);

  const handleIncreaseQuantity = () => {
    if (callUpdateQuantity(quantity, quantity + 1, product.skuId)) {
      setQuantity((prev) => prev + 1);

      setSelectedProducts((prev) =>
        prev.map((item) =>
          item.skuId === product.skuId
            ? { ...item, quantity: quantity + 1 }
            : item
        )
      );
    }
  };

  const handleDeleteCart = async () => {
    const response = await deleteItemInCart({ userId, skuId: product.skuId });
    if (response.metadata.modifiedCount !== 0) {
      toast.success("Delete successful");
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.skuId !== product.skuId)
      );
      setIsModalOpen(false); // Đóng modal sau khi xóa thành công
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      if (callUpdateQuantity(quantity, quantity - 1, product.skuId))
        setQuantity((prev) => prev - 1);

      setSelectedProducts((prev) =>
        prev.map((item) =>
          item.skuId === product.skuId
            ? { ...item, quantity: quantity - 1 }
            : item
        )
      );
    }
  };

  const handleCheckboxChange = () => {
    if (isChecked) {
      setSelectedProducts((prev) =>
        prev.filter((item) => item.skuId !== product.skuId)
      );
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        {
          skuId: product.skuId,
          quantity: quantity,
        },
      ]);
    }
    setIsChecked(!isChecked);
  };

  const callUpdateQuantity = async (old_quantity, quantity, skuId) => {
    const response = await updateQuantity({
      userId,
      item_products: {
        old_quantity,
        quantity,
        skuId,
      },
    });

    if (response.status === 200) {
      return 1;
    } else {
      toast.error("Cập nhật số lượng thất bại");
    }
  };

  return (
    <div className="flex flex-row items-center">
      <div className="flex items-center gap-4">
        {!isCheckout && ( // Ẩn checkbox khi ở trạng thái thanh toán
          <input
            type="checkbox"
            checked={isChecked}
            className="w-4 h-4 cursor-pointer"
            onChange={handleCheckboxChange}
          />
        )}
        <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md border border-gray-300">
          <img
            src={product.imageUrl}
            className="w-full h-full object-contain"
            alt={product.name}
          />
        </div>

        <div className="flex flex-col justify-between">
          <h3 className="lg:text-base md:text-sm text-xs font-bold text-gray-800">
            {product.name}
          </h3>
          {isCheckout && (
            <span className="text-sm font-medium mt-4 text-gray-800 flex items-center w-auto">
              Số lượng: {quantity}
            </span>
          )}
          <div className="flex gap-4 mt-4">
            <div className="relative group">
              {!isCheckout && (
                <>
                  <button
                    type="button"
                    className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                  >
                    {selectedColor}
                    <RiArrowDownSLine className="w-4 h-4 ml-2.5 text-gray-500" />
                  </button>

                  <div className="group-hover:block hidden absolute rounded-md shadow-lg bg-white z-[1000] w-[400px] p-2"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Phần giá và các nút (giảm số lượng, tăng số lượng và xóa) */}
      <div className="ml-auto flex flex-col md:flex-row items-center justify-between w-full md:w-auto space-y-4 md:space-y-0 md:space-x-7">
        {/* Giá */}
        <div className="flex flex-col items-end">
          <span className="text-base font-bold text-gray-800">
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
          {product.discountPrice && (
            <span className="text-xs text-gray-500 line-through">
              {product.discountPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-6 pr-2">
          {/* Giảm số lượng */}
          {!isCheckout && (
            <>
              <button
                type="button"
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full text-gray-600 hover:text-red-500 hover:border-red-500"
                onClick={handleDecreaseQuantity}
              >
                <RiSubtractFill className="w-4 h-4" />
              </button>
              {/* Hiển thị số lượng */}
              <span className="text-sm font-medium text-gray-800 w-6 text-center flex">
                {quantity}
              </span>
              <button
                type="button"
                className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full text-gray-600 hover:text-green-500 hover:border-green-500"
                onClick={handleIncreaseQuantity}
              >
                <RiAddFill className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Xóa */}
          {!isCheckout && (
            <button
              className="text-gray-600 hover:text-red-600"
              onClick={() => setIsModalOpen(true)}
            >
              <RiDeleteBin6Line className="w-6 h-6" />
            </button>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">
                  Xác nhận xóa sản phẩm
                </h3>
                <p className="text-sm text-gray-600 my-4">
                  Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Hủy
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={handleDeleteCart}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
