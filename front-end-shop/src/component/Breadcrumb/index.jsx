import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { FaChevronRight } from "react-icons/fa"; // Mũi tên phải
import { IoHomeOutline } from "react-icons/io5"; // Icon Home

const Breadcrumb = ({ breadcrumbItems }) => {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

  // Kiểm tra xem hiện tại có phải là trang chủ không
  const isHomePage = location.pathname === "/"; // Kiểm tra nếu đường dẫn là "/"

  if (isHomePage) {
    return null; // Nếu là trang chủ, không hiển thị breadcrumb
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {item.link ? (
              <Link
                to={item.link}
                className="inline-flex items-center text-md font-medium text-black hover:text-mainColor"
              >
                {/* Chỉ hiển thị icon home nếu là phần tử "Home" */}
                {item.name === "Home" && (
                  <IoHomeOutline className="w-3 h-3 mr-2.5" />
                )}
                {item.name}
              </Link>
            ) : (
              <span className="text-md font-medium text-black md:ml-2">
                {item.name}
              </span>
            )}
            {index < breadcrumbItems.length - 1 && (
              <FaChevronRight className="rtl:rotate-180 w-3 h-3 text-black mx-1" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
