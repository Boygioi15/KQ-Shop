import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { useState } from "react"
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';


export default function PhoneSignUpForm() {
    const [selectedCountryCode, setSelectedCountryCode] = useState("+84");

    const countryCodes = [
        { code: "+84", country: "VN" },
        { code: "+1", country: "US" },
        { code: "+44", country: "UK" },
        { code: "+91", country: "IN" },
        { code: "+61", country: "AU" },
        { code: "+86", country: "CN" },
      ];

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h1 className="text-center text-2xl font-semibold mb-2">Đăng ký</h1>
            <p className="text-center text-sm text-gray-600 mb-4">
                <i className="fas fa-lock text-green-500"></i> Dữ liệu của bạn được bảo vệ.
            </p>
            <p className="text-center text-red-500 mb-6">GIẢM THÊM 15% CHO ĐƠN HÀNG ĐẦU TIÊN.</p>
            <form className="space-y-4">
                <Input
                    type="text"
                    placeholder="Họ và tên"
                />
                <div>
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
                            type="text"
                            placeholder="Số điện thoại"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 rounded-md">TIẾP TỤC</button>
            </form>
            <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500">Hoặc</span>
                <hr className="flex-grow border-gray-300" />
            </div>

            <div className="space-y-3">
                <Button variant="outline" className="w-full h-12 flex items-center justify-center text-left pl-5 font-normal gap-2 ">
                    <span className="text-xl w-5">@</span>
                    Đăng ký bằng email
                </Button>
                <Button variant="outline" className="w-full h-12 flex items-center justify-center text-left font-normal">
                    <FcGoogle className="mr-2 h-5 w-5" />
                    Tiếp tục với Google
                </Button>
                <Button variant="outline" className="w-full h-12 flex items-center justify-center text-left pl-8 font-normal">
                    <FaFacebook className="mr-2 text-blue-600" />
                    Tiếp tục với Facebook
                </Button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-6">
                Tiếp tục, bạn sẽ đồng ý <a href="#" className="text-blue-500">Chính sách bảo mật</a> & <a href="#" className="text-blue-500">Cookie</a> và <a href="#" className="text-blue-500">Điều khoản</a> và <a href="#" className="text-blue-500">Điều kiện</a> của chúng tôi.
            </p>
        </div>
    );
}