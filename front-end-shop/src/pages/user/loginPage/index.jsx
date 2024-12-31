import { memo, useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm import cho useNavigate
import { callLogin, callLoginGG } from "../../../config/api";
import SignUpDialog from "../../../component/Auth/SignUp";
import FloatingInput from "../../../component/FloatingInput";
import { useDispatch } from "react-redux";
import { setUserLoginInfo } from "../../../redux/slice/accountSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const navigate = useNavigate(); // Khai báo useNavigate
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    try {
      const response = await callLogin(email, password);

      if (response.status === 200 && response.metadata) {
        toast.success(response.message);
        const user = response.metadata.user;
        localStorage.setItem(
          "access_token",
          response.metadata.tokens.accessToken
        );
        localStorage.setItem("user_id", user._id);
        
        dispatch(setUserLoginInfo(user));

        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      // Bắt lỗi nếu có lỗi từ API hoặc kết nối mạng
      toast.error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
      console.error("Login error:", error);
    }
  };
  const handleLoginGG = async () => {
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-16 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FloatingInput
              label="Email address"
              type="email"
              id="email"
              placeholder=" "
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FloatingInput
              label="Password"
              type="password"
              id="password"
              placeholder=" "
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-400 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-400 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
              <p className="mt-4 text-center text-sm text-gray-600 max-w">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  onClick={() => setSignUpDialogOpen(true)} // Mở dialog khi nhấp
                  className="font-medium text-blue-400 hover:text-blue-500"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </form>
          {/* Hiển thị dialog đăng ký */}
          <SignUpDialog
            isOpen={isSignUpDialogOpen}
            onClose={() => setSignUpDialogOpen(false)}
          />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div>
                <button
                  onClick={handleLoginGG}
                  className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                    alt="Google"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
