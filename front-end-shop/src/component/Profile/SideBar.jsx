import { useState, useEffect } from "react";
import { FaTachometerAlt, FaBox, FaMoneyBillWave } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineOrderedList } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { useDispatch, useSelector } from "react-redux";
import ProfileSection from "./ProfileSection";
import { FaLocationDot } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { callLogout } from "../../config/api"; // Import API gọi logout
import { setLogoutAction } from "../../redux/slice/accountSlice"; // Import action logout

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState();
  const navigate = useNavigate(); // Khai báo useNavigate
  const location = useLocation(); // Khai báo useLocation để theo dõi vị trí của URL hiện tại

  // Danh sách các mục trong sidebar
  const items = [
    { icon: AiOutlineOrderedList, text: "Đơn hàng của tôi", path: "/profile/order-list" },
    { icon: AiOutlineHeart, text: "Sản phẩm yêu thích", path: "/profile/favorites" },
    { icon: FaLocationDot, text: "Địa chỉ nhận hàng", path: "/profile/address" },
    { icon: RiLogoutBoxLine, text: "Đăng xuất", path: "/profile/order-list" }, // Giữ path là "/logout"
  ];

  const userAvatar = useSelector((state) => state.account.user.avatar);
  const userName = useSelector((state) => state.account.user.name);
  const userEmail = useSelector((state) => state.account.user.email);

  const dispatch = useDispatch();

  // Hàm xử lý đăng xuất
  const handleLogOut = async () => {
    try {
      const response = await callLogout();

      if (response.status === 200 && response.metadata) {
        dispatch(setLogoutAction()); // Gọi action logout để cập nhật trạng thái trong Redux
        navigate("/"); // Điều hướng về trang chủ sau khi đăng xuất thành công
      } else {
        console.error("Logout failed", response.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Cập nhật activeItem khi URL thay đổi
  useEffect(() => {
    const currentPath = location.pathname; // Lấy đường dẫn hiện tại
    // Tìm mục trong sidebar có path trùng với đường dẫn hiện tại
    const active = items.find(item => currentPath.startsWith(item.path)); 
    setActiveItem(active ? active.text : null); // Cập nhật activeItem
  }, [location]); // Mỗi khi URL thay đổi, chạy lại useEffect

  return (
    <div className="top-0 left-0 min-w-[250px] overflow-auto space-y-4">
      <div className="bg-white py-6 rounded-xl">
        {/* Profile Section */}
        <ProfileSection
          userName={userName}
          userAvatar={userAvatar}
          userEmail={userEmail}
        />
      </div>
      <div className="relative flex flex-col h-full bg-white rounded-xl py-6">
        {/* Sidebar Items */}
        <ul className="space-y-3 flex-1">
          {items.map((item) => (
            <li key={item.text}>
              {item.text === "Đăng xuất" ? (
                // Đối với mục "Đăng xuất", vẫn sử dụng Link nhưng sẽ gọi handleLogOut
                <Link
                  to={item.path}
                  onClick={(e) => {
                    e.preventDefault(); // Ngừng điều hướng khi nhấn vào "Đăng xuất"
                    handleLogOut(); // Gọi handleLogOut
                  }}
                  className={`text-sm flex items-center px-8 py-4 transition-all ease-in-out duration-300 ${
                    activeItem === item.text
                      ? "text-[#007bff] border-r-[5px] border-[#077bff] bg-gray-100"
                      : "text-black hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-[18px] h-[18px] mr-4" />
                  <span>{item.text}</span>
                </Link>
              ) : (
                // Các mục khác vẫn giữ Link bình thường
                <Link
                  to={item.path}
                  onClick={() => setActiveItem(item.text)}
                  className={`text-sm flex items-center px-8 py-4 transition-all ease-in-out duration-300 ${
                    activeItem === item.text
                      ? "text-[#007bff] border-r-[5px] border-[#077bff] bg-gray-100"
                      : "text-black hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-[18px] h-[18px] mr-4" />
                  <span>{item.text}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
