import { useState } from "react"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { FaPhone, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link } from "react-router-dom";

import {ErrorModal, SuccessModal} from "../../reusable-components/Modal/Modal";
import OTPVerification from "./OTPVerification";
import { useLoading } from "../../contexts/LoadingContext";

const EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com'
]

export default function SignUpForm() {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState(""); 
  const [phone, setPhone] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isPhoneForm, setIsPhoneForm] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode] = useState("+84");
  const [errors, setErrors] = useState({ email: "", phone: "", password: "" });
  const [token, setToken] = useState(null);
  const [registerDto, setRegisterDto] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [messageFromServer, setMessageFromServer] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const {showLoading, hideLoading} = useLoading();
  const countryCodes = [
    { code: "+84", country: "VN" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "IN" },
    { code: "+61", country: "AU" },
    { code: "+86", country: "CN" },
 ];

  const toggleForm = () => {
    setIsPhoneForm(!isPhoneForm)
    setErrors({ email: "", phone: "", password: "" });
  }

  const validatePhone = (phone) => {
    return /^\d{9,11}$/.test(phone);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    setShowSuggestions(value.includes('@') && !value.split('@')[1]);

    if (!validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Email không hợp lệ." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    if (!validatePhone(value)) {
      setErrors((prev) => ({ ...prev, phone: "Số điện thoại không hợp lệ." }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length <= 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Mật khẩu phải dài hơn 6 ký tự.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSuggestionClick = (domain) => {
    const username = email.split('@')[0]
    setEmail(`${username}@${domain}`)
    setShowSuggestions(false)
    setErrors((prev) => ({ ...prev, email: "" }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPhoneForm) {
      if (!validatePhone(phone)) {
        alert("Vui lòng nhập số điện thoại hợp lệ.");
        return;
      }
    } else {
      if (!validateEmail(email)) {
        alert("Vui lòng nhập địa chỉ email hợp lệ.");
        return;
      }
      if (password.length <= 6) {
        alert("Mật khẩu phải dài hơn 6 ký tự.");
        return;
      }
    }


    const fullName = e.target.fullName.value; 
    let identifier = isPhoneForm ? selectedCountryCode + phone : email;

    const registerDto = isPhoneForm
      ? {
          fullName: fullName,
          identifier: identifier,
        }
      : {
          fullName: fullName,
          identifier: identifier,
          password: password,
        };

    setRegisterDto(registerDto);

    try {
      showLoading();
      const response = await fetch('http://localhost:8000/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerDto),
      });
      
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setShowOTPModal(true);
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors); 
        setMessageFromServer(errorData.message + ". Vui lòng thử lại");
        setIsErrorModalOpen(true);
        
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
    finally{
      hideLoading();
    }
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    console.log(`Logging in with ${provider}`);

    // Redirect the user to the backend endpoint for social login
    window.location.href = `http://localhost:8000/api/auth/${provider}`;
  };

  return (
    <div className={`w-full max-w-md mx-auto p-6 space-y-6`}>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Đăng ký</h1>
        <div className="flex items-center justify-center text-sm text-green-500 gap-2 ">
          <LockIcon className="w-4 h-4" />
          <p>Dữ liệu của bạn được bảo vệ.</p>
        </div>
        <p className="text-sm text-red-500">
          GIẢM THÊM 15% CHO ĐƠN HÀNG ĐẦU TIÊN.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} disabled={loading}>
        <Input
          name="fullName"
          type="text"
          placeholder="Họ và tên"
        />
        {!isPhoneForm ? (
          <>
            <div className="relative">
                  <Input
                      name="email"
                      type="email"
                      placeholder="Địa chỉ email"
                      value={email}
                      onChange={handleEmailChange} />
                  {errors && errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                  {showSuggestions && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                          {EMAIL_DOMAINS.map((domain) => (
                              <button
                                  key={domain}
                                  type="button"
                                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                  onClick={() => handleSuggestionClick(domain)}
                              >
                                  {email.split('@')[0]}@{domain}
                              </button>
                          ))}
                      </div>
                  )}
              </div>
              <div className="relative">
                  <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={handlePasswordChange}
                      className="pr-10" />
                  <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                  >
                      {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                  </button>
              </div>
              {errors && errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
              )}
          </>
      ) : (
          < >
          <div className="flex">
              <select
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
              className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
              >
              {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                  {country.code} ({country.country})
                  </option>
              ))}
              </select>
              <Input
                  name="phone"
                  type="text"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={handlePhoneChange}
              />
          </div>
          {errors && errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
          </>
        )}
        <div className="flex justify-between text-sm !m-0">
            <div className="text-left !m-0 text-gray">
                <p className="text-gray-500 opacity-80">
                    Đã có tài khoản? <Link to="/auth" className="text-blue-600 hover:underline">Đăng nhập</Link>
                </p>
            </div>
            <div className="text-right !m-0">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                    Quên mật khẩu?
                </a>
            </div>
        </div>
        <div className="relative">
          <Button
            type="submit"
          >
            TIẾP TỤC
          </Button>
        </div>
      </form>

      {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md max-w-md w-full">
            <OTPVerification setShowOTPModal={setShowOTPModal} token={token} registerDto={registerDto} />
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-gray-500">
            Hoặc
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={toggleForm} 
          variant="outline" 
          className={`w-full h-12 flex items-center justify-center text-left font-normal ${
            !isPhoneForm ? "pl-14" : "pl-1 gap-2"
        }`}>
          {!isPhoneForm ? (
                <>
                <FaPhone className="mr-2" />
                Đăng ký với số điện thoại
                </>
            ) : (
                <>
                <span className="text-xl w-5">@</span>
                Đăng ký với Email
                </>
            )}
        </Button>
        <Button 
          onClick={() => handleSocialLogin("google")}
          disabled={loading}
          variant="outline" 
          className="w-full h-12 flex items-center justify-center text-left font-normal">
            <FcGoogle className="mr-2 h-5 w-5" />
            Tiếp tục với Google
        </Button>
        <Button 
          onClick={() => handleSocialLogin("facebook")}
          disabled={loading}
          variant="outline" 
          className="w-full h-12 flex items-center justify-center text-left pl-8 font-normal">
            <FaFacebook className="mr-2 text-blue-600" />
            Tiếp tục với Facebook
        </Button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
          Tiếp tục, bạn sẽ đồng ý <a href="#" className="text-blue-500">Chính sách bảo mật</a> & <a href="#" className="text-blue-500">Cookie</a> và <a href="#" className="text-blue-500">Điều khoản</a> và <a href="#" className="text-blue-500">Điều kiện</a> của chúng tôi.
      </p>

      <ErrorModal 
        isOpen={isErrorModalOpen} 
        onClose={() => setIsErrorModalOpen(false)} 
        message={"Đăng kí thất bại: "+ messageFromServer} 
      />
    </div>
  )
}