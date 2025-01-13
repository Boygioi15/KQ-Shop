import { Route, Routes, Navigate } from "react-router-dom";
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
        {/* Admin Routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/sales-analytics" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/sales-analytics" element={<DashBoard />} />
          <Route path="/products/add" element={<AddProductPage />} />
          <Route path="/products/edit/:id" element={<AddProductPage />} />
          <Route path={"/orders"} element={<OrderListPage />} />
          <Route path="/stock" element={<StockPage />} />
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
