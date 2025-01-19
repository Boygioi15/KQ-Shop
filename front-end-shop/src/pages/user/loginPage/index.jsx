import { memo, useState } from "react";
import { useNavigate } from "react-router-dom"; // Thêm import cho useNavigate
import { callLogin } from "../../../config/api";
import { jwtDecode } from 'jwt-decode';
import FloatingInput from "../../../component/FloatingInput";
import { useDispatch } from "react-redux";
import { setUserLoginInfo } from "../../../redux/slice/accountSlice";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isPasswordScreen, setIsPasswordScreen] = useState(false)
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleContinue = (e) => {
    e.preventDefault()
    if (!isPasswordScreen) {
      setIsPasswordScreen(true)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const loginDto = {
        identifier: email, 
        password: password
      };
      const response = await callLogin(loginDto);

      if (response.status === 201 && response.data) {
        const token = response.data['token'];
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        toast.success('Login successfully');
        localStorage.setItem("access_token", token);
        localStorage.setItem("user_id", decoded._id);
        
        dispatch(setUserLoginInfo({
          _id: decoded._id,
        }));

        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
        {/* Title */}
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight">
          {isPasswordScreen ? 'Nhập mật khẩu của bạn' : 'Chào mừng trở lại'}
        </h2>

        {/* Form */}
        <form onSubmit={handleContinue} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
            {/* Email Field */}
            <div className="relative">
              <FloatingInput
                label="Địa chỉ Email"
                type="email"
                id="email"
                placeholder=" "
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isPasswordScreen && (
                <button
                  type="button"
                  onClick={() => setIsPasswordScreen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-500"
                >
                  Sửa
                </button>
              )}
            </div>

            {/* Password Field */}
            {isPasswordScreen && (
              <div className="relative">
                <FloatingInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
            )}
          </div>

          {/* Forgot Password */}
          {isPasswordScreen && (
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
                Lưu mật khẩu
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>
          )}

          <button
          onClick={isPasswordScreen ? handleSubmit : handleContinue}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
          >
          Tiếp tục
          </button>
        </form>
      </div>
    </div>
  )
}

export default memo(LoginPage);