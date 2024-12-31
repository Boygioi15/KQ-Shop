const CartEmpty = () => {
  return (
    <div className="flex items-center justify-between bg-white py-[18px] sm:w-full flex-col-reverse sm:px-4 md:px-8 lg:px-[100px] pc:rounded-4xl">
      <div className="flex flex-col items-center sm:text-center">
        <p className="text-xl sm:text-2xl font-semibold mb-2">
          Chưa có sản phẩm nào trong giỏ hàng
        </p>
        <p className="text-base sm:text-lg text-gray-600 mb-4">
          Cùng mua sắm hàng ngàn sản phẩm tại AppleHouse nhé!
        </p>
        <a
          href="/"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors sm:self-center"
        >
          Mua hàng
        </a>
      </div>

      <div className="relative h-auto w-full max-w-[750px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[750px] mx-auto pc:mr-[-50px]">
        <img
          alt="Empty cart illustration"
          loading="lazy"
          decoding="async"
          src="https://fptshop.com.vn/img/empty_cart.png?w=1920&amp;q=100"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default CartEmpty;
