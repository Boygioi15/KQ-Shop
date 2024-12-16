import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layouts/RootLayout/RootLayout";
import HomePage from "./pages/HomePage/Homepage";
import AuthPage from "./pages/AuthPage/AuthPage"
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import './standard-style/style.css'
import ProductPage from "./pages/ProductPage/ProductPage";

import { CartProvider } from "./contexts/CartContext";
import SignUpForm from "./pages/AuthPage/SignUp";
import SignInForm from "./pages/AuthPage/SignIn";
import OTPVerification from "./pages/AuthPage/OTPVerification";
import { AuthProvider } from "./contexts/AuthContext";

import SocialCallback from "./components/SocialCallback";

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
        path: "products/:search",
        element: <ProductPage />
      }
        
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router} /> 
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);
