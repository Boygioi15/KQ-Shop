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
  USER: {
    HOME: "",
    LOGIN: "/login",
    PRODUCTS: "/products", // Trang danh sách tất cả các sản phẩm
    PRODUCT_DETAIL: (productId = ":productId") => `/products/${productId}`, // Trang chi tiết sản phẩm
    CART: "/cart", // Giỏ hàng
    PROFILE: "/profile",
    ORDER_LIST: "/profile/order-list",
    FAVORITES: "/profile/favorites",
    ADDRESS: "/profile/address",
  },
  ADMIN: [
    {
      name: "Thông kê doanh số",
      icon: <FaTachometerAlt />,
      path: "/admin/sales-analytics",
    },
    {
      name: "Sản phẩm ",
      icon: <FaBox />,
      links: [
        { name: "Nổi bật", path: "/admin/top-products" },
        { name: "Kho hàng", path: "/admin/stock" },
        { name: "Thêm mới sản phẩm", path: "/admin/products/add" },
      ],
    },
    {
      name: "Đơn hàng",
      icon: <FaShoppingCart />,
      path: "/admin/orders",
    },
    {
      name: "Đánh giá",
      icon: <FaStar />,
      path: "/admin/reviews",
    },
    {
      name: "Khách hàng",
      icon: <FaUser />,
      path: "/admin/customers",
    },
    {
      name: "Banners",
      icon: <FaUser />,
      path: "/admin/customers",
    },
    {
      name: "Khuyến mãi",
      icon: <FaUser />,
      path: "/admin/customers",
    },
    {
      name: "Flash Sale",
      icon: <FaUser />,
      path: "/admin/customers",
    },
    {
      name: "Sự kiện ưu đãi",
      icon: <FaUser />,
      path: "/admin/customers",
    },

    {
      name: "Pages",
      icon: <IoIosPaper />,
      links: [
        { name: "Login", path: "/admin/login" },
        { name: "Page 404", path: "/admin/404" },
      ],
    },
    {
      name: "Settings",
      icon: <FaCogs />,
      links: [
        { name: "General Settings", path: "/admin/general-settings" },
        { name: "Connected Apps", path: "/admin/connected-apps" },
      ],
    },
  ],
};

export default ROUTERS;
