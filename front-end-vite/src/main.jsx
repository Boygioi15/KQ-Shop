import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout/RootLayout";
import HomePage from "./pages/HomePage/Homepage";
import AuthPage from "./pages/AuthPage/AuthPage"
import './main.css'
//specified element here
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "auth",
        element: <AuthPage />,
        children: [
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
      /*
      {
        path: "/user/user-space",
        element: <UserInfoLayout />,
      },
      */
      
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
