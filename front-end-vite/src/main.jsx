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
      <RouterProvider router={router} /> 
    </CartProvider>
      
  </React.StrictMode>
);
