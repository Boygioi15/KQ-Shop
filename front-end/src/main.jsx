import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { AuthProvider } from "./Context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import ForgotPasswordPage from "./pages/LoginPage/ForgotPassPage";
import SuccessPage from "./pages/LoginPage/SuccessPage";
import UserInfoLayout from "./layouts/UserSpaceLayout";
import UserInfoPage from "./pages/UserPage/UserInfor";
import UserChangePass from "./pages/UserPage/UserChangePass";
import UserTransHistory from "./pages/UserPage/UserTransHistory";
import "./index.css";
import "./App.css";
//specified element here
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
        children: [
          {
            path: "/forgot-password",
            //element: <ForgotPasswordPage />
          },
          {
            path: "/login-success",
            //element: <LoginSuccessPage />,
          },
        ],
      },
      {
        path: "/user/user-space",
        element: <UserInfoLayout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
