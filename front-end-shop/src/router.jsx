import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccount } from "./redux/slice/accountSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Layouts
import MasterLayout from "./layout/userLayout";
import AdminLayout from "./layout/adminLayout";

// Pages
import HomePage from "./pages/user/homePage";
import LoginPage from "./pages/user/loginPage";
import ProductPage from "./pages/user/productPage";
import DetailProduct from "./pages/user/detailProduct";
import CartPage from "./pages/user/cartPage";
import ProfilePage from "./pages/user/profilePage";

// Admin Pages (commented out, can be added later)
import DashBoard from "./pages/admin/dashBoard";
import OrderListPage from "./pages/admin/orderListPage";

import OrderHistory from "./component/Profile/OrderList"; // Thêm trang OrderHistory

import { ROUTERS } from "./utils/router";
import Info from "./component/Profile/Info";
import Favorites from "./component/Profile/Favorites";
import Address from "./component/Profile/Address";
import SearchPage from "./pages/user/searchPage";
import AddProductPage from "./pages/admin/addProductPage";
import StockPage from "./pages/admin/stockPage";

const RouterCustom = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  useEffect(() => {
    if (!account || !account.id) {
      dispatch(fetchAccount());
    }
  }, [account, dispatch]);

  return (
    <>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<MasterLayout />}>
          <Route
            path={ROUTERS.USER.HOME}
            element={<HomePage />}
            breadcrumbItems={[{ name: "Home", link: "/" }]} // Truyền breadcrumb cho Home
          />
          <Route
            path={ROUTERS.USER.LOGIN}
            element={<LoginPage />}
            breadcrumbItems={[
              { name: "Home", link: "/" },
              { name: "Login", link: ROUTERS.USER.LOGIN },
            ]} // Truyền breadcrumb cho Login
          />
          <Route
            path={ROUTERS.USER.HOME + "/:categorySlug"}
            element={<ProductPage />}
            breadcrumbItems={[
              { name: "Home", link: "/" },
              { name: "Products", link: ROUTERS.USER.HOME },
            ]} // Truyền breadcrumb cho Products
          />
          <Route
            path={ROUTERS.USER.HOME + "/tim-kiem"}
            element={<SearchPage />}
            breadcrumbItems={[
              { name: "Home", link: "/" },
              { name: "Search", link: ROUTERS.USER.HOME + "/tim-kiem" },
            ]} // Truyền breadcrumb cho Search
          />
          <Route path={ROUTERS.USER.CART} element={<CartPage />} />

          {/* Profile Routes */}
          <Route path={ROUTERS.USER.PROFILE} element={<ProfilePage />}>
            <Route index element={<Info />} />
            <Route path="" element={<Info />} />
            <Route path={ROUTERS.USER.ORDER_LIST} element={<OrderHistory />} />
            <Route path={ROUTERS.USER.FAVORITES} element={<Favorites />} />
            <Route path={ROUTERS.USER.ADDRESS} element={<Address />} />
          </Route>

          <Route
            path={ROUTERS.USER.PRODUCT_DETAIL(":productId")}
            element={<DetailProduct />}
          />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/sales-analytics" element={<DashBoard />} />
          <Route path="/admin/products/add" element={<AddProductPage />} />
          <Route path="/admin/products/edit/:id" element={<AddProductPage />} />
          <Route path={ROUTERS.ADMIN.ORDER} element={<OrderListPage />} />
          <Route path="/admin/stock" element={<StockPage />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
        pauseOnHover={true}
        draggable={true}
        rtl={false}
      />
    </>
  );
};

export default RouterCustom;
