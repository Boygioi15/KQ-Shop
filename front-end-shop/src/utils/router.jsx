import {
  FaTachometerAlt,
  FaBox,
  FaChartLine,
  FaStar,
  FaUser,
  FaMoneyBillWave,
  FaCogs,
  FaShoppingCart,
} from "react-icons/fa"; // For commonly used icons
import { IoIosPaper, IoIosCart } from "react-icons/io"; // For Pages and Orders

export const ROUTERS = {
  // USER: {
  //   HOME: "",
  //   LOGIN: "/login",
  //   PRODUCTS: "/products", // Trang danh sách tất cả các sản phẩm
  //   PRODUCT_DETAIL: (productId = ":productId") => `/products/${productId}`, // Trang chi tiết sản phẩm
  //   CART: "/cart", // Giỏ hàng
  //   PROFILE: "/profile",
  //   ORDER_LIST: "/profile/order-list",
  //   FAVORITES: "/profile/favorites",
  //   ADDRESS: "/profile/address",
  // },
  ADMIN: [
    {
      name: "Thống kê doanh số",
      icon: <FaTachometerAlt />,
      path: "/sales-analytics",
    },
    {
      name: "Sản phẩm ",
      icon: <FaBox />,
      links: [
        { name: "Kho hàng", path: "/stock" },
        { name: "Thêm mới sản phẩm", path: "/products/add" },
      ],
    },
    {
      name: "Đơn hàng",
      icon: <FaShoppingCart />,
      path: "/orders",
    },
  ],
};

export default ROUTERS;
