import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout/RootLayout";
import UserSpaceLayout from "./layouts/UserSpaceLayout/UserSpaceLayout";
import HomePage from "./pages/HomePage/Homepage";
import AuthPage from "./pages/AuthPage/AuthPage"
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import './standard-style/style.css'
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import { CartProvider } from "./contexts/CartContext";
import SignUpForm from "./pages/AuthPage/SignUp";
import SignInForm from "./pages/AuthPage/SignIn";
import OTPVerification from "./pages/AuthPage/OTPVerification";
import { AuthProvider } from "./contexts/AuthContext";
import OrderPage from "./pages/PaymentPage/OrderPage";
import SuccessPage from "./pages/PaymentPage/SuccessPage";
import SocialCallback from "./components/SocialCallback";

import "./standard-style/normalCss.css"
import AccountInfoPage from "./pages/UserSpacePages/AccountInfoPage/AccountInfoPage";
import { LoadingProvider } from "./contexts/LoadingContext";
import ChangePasswordPage from "./pages/UserSpacePages/ChangePasswordPage/ChangePasswordPage";
import AddressPage from "./pages/UserSpacePages/AddressPage/AddressPage";
import CartCheckoutPage from "./pages/CartCheckoutPage/CartCheckoutPage";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
//specified element here
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootLayout><ErrorPage/></RootLayout>,
    children: [
      {
        index: true,
        element: <HomePage />,  
      },
      {
        path: "auth",
        element: <AuthPage />,
        children: [
          // Add child routes here if needed
          {
            index: true,
            element: <SignInForm />, 
          },
          {
            path: "sign-up",
            element: <SignUpForm /> 
          },
          {
            path: "verify-otp",
            element: <OTPVerification /> 
          },
          {
            path: "social-callback",
            element: <SocialCallback /> 
          },
          /*
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />
          },
          {
            path: "/login-success",
            element: <LoginSuccessPage />,
          },
          */
        ],
      },
      {
        path: "user-space",
        element: <UserSpaceLayout />,
        children: [
          {
            path: "account",
            element: <AccountInfoPage />
          },
          {
            path: "password",
            element: <ChangePasswordPage />
          },
          {
            path:"address",
            element: <AddressPage />
          }
        ]
      },
      {
        path: "products/:search",
        element: <ProductPage />
      },
      {
        path: "product-detail/:id",
        element: <ProductDetailPage />
      },
      {
        path: "payment",
        children: [
          {
            index: true,
            element: <OrderPage />, 
          },
          {
            path: "success",
            element: <SuccessPage />,
          },
        ],
      },
      {
        path:"cart",
        element: <CartCheckoutPage />
      },
      {
        path:"transaction",
        element: <TransactionPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <CartProvider>
        <AuthProvider>
          <RouterProvider router={router} />   
        </AuthProvider>
      </CartProvider>
    </LoadingProvider>
  </React.StrictMode>
);
