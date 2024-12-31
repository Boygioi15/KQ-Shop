import { useState } from "react";
import { Link } from "react-router-dom";
import ROUTERS from "../../../utils/router";
import { AiOutlineDown } from "react-icons/ai"; // For dropdown toggle

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [openItems, setOpenItems] = useState({});

  // Toggle dropdown visibility by name
  const toggleDropdown = (name) => {
    setOpenItems((prevState) => {
      const newOpenItems = { ...prevState };
      Object.keys(newOpenItems).forEach((key) => {
        if (key !== name) delete newOpenItems[key]; // Close other items
      });
      newOpenItems[name] = !newOpenItems[name]; // Toggle current item
      return newOpenItems;
    });
    setActiveItem(name);
  };

  const handleLinkClick = (itemName) => {
    setActiveItem(itemName); // Set active item
    if (ROUTERS.ADMIN.some((item) => item.name === itemName && item.links)) {
      setOpenItems((prevState) => ({
        ...prevState,
        [itemName]: true,
      }));
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-96 px-10 bg-white overflow-y-auto shadow-xl z-50 transform transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mt-10 flex flex-col h-full">
          <a href="/admin/dashboard" className="font-bold text-3xl text-black text-start">AppleHouse</a>
          <ul className="space-y-3 my-8 flex-1 text-xl font-bold">
            {ROUTERS.ADMIN.map((item) => (
              <li key={item.name}>
                {/* Dropdown for items with sub-links */}
                {item.links ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center px-8 py-4 w-full transition-all ease-in-out duration-300 ${activeItem === item.name || openItems[item.name] ? "text-[#007bff] bg-gray-100" : "text-black hover:bg-gray-100"}`}
                    >
                      {item.icon && <span className="mr-4">{item.icon}</span>}
                      <span>{item.name}</span>
                      <AiOutlineDown className={`ml-auto w-4 h-4 transform transition-transform duration-300 ${openItems[item.name] ? "rotate-180" : ""}`} />
                    </button>
                    {/* Sub-items (Dropdown content) */}
                    <div className={`pl-8 space-y-2 mt-2 transition-all duration-500 ease-in-out transform ${openItems[item.name] ? "opacity-100 max-h-[500px] overflow-visible" : "opacity-0 max-h-0 overflow-hidden"}`}>
                      {item.links.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.path}
                            onClick={() => setActiveItem(subItem.name)}
                            className={`flex items-center px-8 py-4 transition-all ease-in-out duration-300 ${activeItem === subItem.name ? "text-[#007bff] bg-gray-100" : "text-black hover:bg-gray-100"}`}
                          >
                            <span>{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Regular link without dropdown
                  <Link
                    to={item.path}
                    onClick={() => handleLinkClick(item.name)}
                    className={`flex items-center px-8 py-4 transition-all ease-in-out duration-300 ${activeItem === item.name ? "text-[#007bff] bg-gray-100" : "text-black hover:bg-gray-100"}`}
                  >
                    {item.icon && <span className="mr-4">{item.icon}</span>}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
