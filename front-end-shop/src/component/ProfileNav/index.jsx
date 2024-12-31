import { useRef, useState } from "react";
import { callLogout } from "../../config/api";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutAction } from "../../redux/slice/accountSlice";
import { toast } from "react-toastify";
const ProfileNavBar = ({ userAvatar, userName }) => {
  const isAuthenticated = useSelector((state) => {
    return state.account.isAuthenticated;
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false); // Đóng dropdown khi chuột rời khỏi
  };

  const handleLogOut = async () => {
    try {
      const response = await callLogout();

      if (response.status === 200 && response.metadata) {
        dispatch(setLogoutAction());
        navigate("/"); // Điều hướng về trang chủ sau khi đăng xuất
      } else {
        // Hiển thị lỗi nếu đăng xuất không thành công
        toast.error(response.message);
      }
    } catch (error) {
      // Bắt lỗi nếu có lỗi từ API hoặc kết nối mạng
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <a
            ref={dropdownRef}
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="User menu"
            aria-haspopup="true"
          >
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={userAvatar}
              alt="User Avatar"
            />
            <span className="text-sm">{userName || "Thịnh"}</span>
          </a>
          {dropdownOpen && (
            <div className="absolute -right-2 w-48 bg-white rounded-md shadow-lg z-50">
              <Link
                to="/profile" // Sửa href thành to cho Link từ react-router-dom
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </Link>
              <Link
                to="/settings" // Sửa href thành to cho Link từ react-router-dom
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={handleLogOut}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to={"/login"}>
          <AiOutlineUser className="font-semibold text-2xl" />
        </Link>
      )}
    </>
  );
};

export default ProfileNavBar;
