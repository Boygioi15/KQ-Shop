import { memo } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:mx-12 lg:mx-28">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Apple House</h2>
            <p className="mb-4">
              Trường Đại học Công nghệ thông tin - Đại học Quốc gia TP.Hồ Chí Minh
            </p>
            <p>Số điện thoại: 0912345678 - 0987654321</p>
            <p>Email: contact@gmail.com</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">Trang chủ</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Sản phẩm</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Khuyến mãi</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Liên hệ</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Giới thiệu</a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">Chính sách bảo hành</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Chính sách đổi trả</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Chính sách vận chuyển</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">Hướng dẫn mua hàng</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kết nối với chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-gray-400">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-gray-400">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-gray-400">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-gray-400">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2024 Apple House. All rights reserved.</p>
      </div>
    </div>
  );
};

export default memo(Footer);
