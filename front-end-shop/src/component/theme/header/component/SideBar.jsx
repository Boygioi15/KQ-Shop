import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { submenuItems, displayNames } from "../Data/MenuItems";
import "../../../../style/sideBar.css";

const SideBar = ({ isOpen, setIsOpen }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "overlay-visible" : "overlay-hidden"}`}
        onClick={() => {
          setIsOpen(false);
          setSelectedItem(null);
        }}
      />

      {/* Sidebar chính */}
      <div
        className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sidebar-header">
          <IoCloseOutline
            onClick={() => {
              setIsOpen(false);
              setSelectedItem(null);
            }}
            className="close-icon"
          />
        </div>

        <div className="p-8">
          <div className="flex flex-col gap-8 mt-8">
            {Object.keys(submenuItems).map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className="flex items-center justify-between font-bold cursor-pointer hover:bg-gray-200 p-2 rounded transition-colors duration-300"
              >
                <span>{displayNames[item]}</span>
                <FaAngleRight className="text-gray-500" />
              </div>
            ))}
          </div>

          {/* Tích hợp lại mục Favorites, Cart, và Login */}
          <div className="grid grid-cols-3 gap-4 mt-4 border-t">
            <a
              href="/favorites"
              className="flex items-center justify-center gap-2 font-bold hover:bg-gray-200 p-2 rounded transition-colors duration-300"
            >
              <AiOutlineHeart className="text-2xl" />
            </a>
            <a
              href="/cart"
              className="flex items-center justify-center gap-2 font-bold hover:bg-gray-200 p-2 rounded transition-colors duration-300"
            >
              <IoCartOutline className="text-2xl" />
            </a>
            <a
              href="/login"
              className="flex items-center justify-center gap-2 font-bold hover:bg-gray-200 p-2 rounded transition-colors duration-300"
            >
              <AiOutlineUser className="text-2xl" />
            </a>
          </div>
          {/* Căn giữa About và Contact */}
          <div className="flex justify-between px-20 gap-8 mt-4">
            <a
              className="font-bold transition-colors duration-300 hover:text-blue-500"
              href="/"
            >
              About
            </a>
            <a
              className="font-bold transition-colors duration-300 hover:text-blue-500"
              href="/login"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Sidebar con */}
      <div
        className={`sidebar ${selectedItem ? "sidebar-open" : "sidebar-close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sidebar-header">
          <FaAngleLeft
            onClick={() => setSelectedItem(null)}
            className="close-icon"
          />
        </div>
        {selectedItem && (
          <div className="p-8">
            <h2 className="sidebar-title">{displayNames[selectedItem]}</h2>
            <div className="flex flex-col gap-4">
              {submenuItems[selectedItem].map((subItem, subIndex) => (
                <a
                  key={subIndex}
                  href="#"
                  className="text-gray-700 hover:text-blue-500 transition-colors duration-300"
                >
                  {subItem}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
