import { useState, useRef, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiMacbookLine } from "react-icons/ri";
import { CgAppleWatch } from "react-icons/cg";
import { TbDeviceIpad } from "react-icons/tb";
import { RiBattery2ChargeLine } from "react-icons/ri";
import { getAllCategory } from "../../../../config/api"; // Đảm bảo API đã được import

const DropdownMenu = ({ headerHeight }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false); // Đóng dropdown khi chuột rời khỏi
  };

  const handleMouseLeaveSubmenu = () => {
    setSelectedItem(null); // Đóng submenu khi chuột rời khỏi
  };

  // Tính chiều cao của menu dựa trên số lượng mục
  const getMenuHeight = () => {
    return categoryList.length * 40; // Giả sử mỗi mục có chiều cao là 40px
  };

  // Mã hóa các từ khóa với các biểu tượng cho mỗi danh mục
  const iconMapping = {
    phone: <IoPhonePortraitOutline className="mr-2" />,
    mac: <RiMacbookLine className="mr-2" />,
    watch: <CgAppleWatch className="mr-2" />,
    ipad: <TbDeviceIpad className="mr-2" />,
    accessorie: <RiBattery2ChargeLine className="mr-2" />,
  };

  // Hàm trả về biểu tượng dựa trên tên danh mục
  const getIconForCategory = (categoryName) => {
    // Duyệt qua các từ khóa trong iconMapping để tìm biểu tượng
    for (const keyword in iconMapping) {
      if (categoryName.toLowerCase().includes(keyword)) {
        return iconMapping[keyword];
      }
    }
    return <RiBattery2ChargeLine className="mr-2" />; // Biểu tượng mặc định
  };

  // Gọi API để lấy các danh mục
  useEffect(() => {
    getCategory(); // Lấy danh mục ở đây
  }, []);

  const getCategory = async () => {
    try {
      // Lấy danh mục từ API
      const response = await getAllCategory();
      console.log(response.metadata);

      // Kiểm tra nếu response thành công
      if (response.status === 200 && response.metadata) {
        // Cập nhật danh sách category từ API
        const categories = response.metadata.map((category) => ({
          id: category._id, // Sử dụng _id, tùy vào cấu trúc response
          name: category.category_name,
          link: `/${category.category_slug}`, // Giả sử slug là một thuộc tính trong response của API
          subItems: category.children || [], // Lấy danh sách subItems từ API
        }));

        setCategoryList(categories);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  return (
    <div>
      {/* Overlay: Chỉ áp dụng opacity cho phần dưới header */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          style={{ top: `${headerHeight}px` }} // Đảm bảo overlay bắt đầu từ dưới header
          onClick={() => setDropdownOpen(false)} // Đóng dropdown khi overlay bị click
        />
      )}
      <div
        className="relative ml-10 py-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={dropdownRef}
      >
        {/* Nút dropdown */}
        <button className="flex items-center text-gray-700 font-bold justify-center px-4 py-2 h-full bg-gray-200 rounded-full hover:bg-gray-300 w-36">
          Danh mục
          <MdArrowDropDown />
        </button>

        {/* Menu dropdown */}
        {dropdownOpen && (
          <div
            className="bg-white font-bold z-[45] list-none rounded-l-lg custom-shadow-left w-44 absolute right-0 mt-1 border-r-2 border-gray-300"
            style={{
              height: getMenuHeight(),
            }}
          >
            <ul className="py-1">
              {categoryList.map((category) => (
                <li
                  key={category.id}
                  onMouseEnter={() => setSelectedItem(category.id)} // Giữ submenu mở khi di chuột vào mục
                  className="relative"
                >
                  <a
                    href={category.link} // Sử dụng link từ API
                    className="text-sm hover:bg-gray-100 text-gray-700 px-4 py-2 flex items-center"
                  >
                    {getIconForCategory(category.name)}{" "}
                    {/* Sử dụng biểu tượng thích hợp */}
                    {category.name} {/* Hiển thị tên danh mục */}
                  </a>
                </li>
              ))}
            </ul>

            {/* Hiển thị submenu nếu có mục đã chọn */}
            {selectedItem && (
              <div
                onMouseEnter={() => setSelectedItem(selectedItem)} // Giữ submenu mở khi di chuột vào submenu
                onMouseLeave={handleMouseLeaveSubmenu} // Đóng submenu khi chuột rời khỏi
                className="bg-white rounded-r-lg custom-shadow-right absolute top-0 left-full w-max border-l-2 border-gray-300"
                style={{
                  height: getMenuHeight(), // Đặt chiều cao cho submenu
                  transform: selectedItem
                    ? "translateX(0)"
                    : "translateX(-20px)", // Di chuyển từ trái sang phải
                  opacity: selectedItem ? 1 : 0,
                  transition: "transform 0.3s ease, opacity 0.3s ease", // Hiệu ứng mượt mà cho submenu
                }}
              >
                <ul className="py-1 grid grid-cols-4 gap-2">
                  {/* Submenu chỉ hiển thị nếu có subitems */}
                  {categoryList
                    .find((category) => category.id === selectedItem)
                    ?.subItems?.map((subItem) => (
                      <li key={subItem._id}>
                        <a
                          href={`/products/${subItem.category_slug}`} // Giả sử subitem có category_slug
                          className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                        >
                          {subItem.category_name} {/* Hiển thị tên subitem */}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
