import { memo, useState } from "react";
import { IoIosMenu, IoIosSearch } from "react-icons/io"; // Import search icon
import { PiBellSimpleRinging } from "react-icons/pi"; // Import notification icon
import NotificationMenu from "../../Notification/notificationMenu"; // Notification menu component
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"; // Import framer-motion for animations
import Search from "../../SearchBox"; // Search component

const Header = ({ setIsSidebarOpen }) => {
  const mockNotifications = [
    { message: "Your order has been shipped.", time: "2 minutes ago" },
    { message: "New message from customer support.", time: "1 hour ago" },
    { message: "Product back in stock: iPhone 13", time: "3 hours ago" },
    { message: "Flash Sale starting soon!", time: "1 day ago" },
  ];

  const navigate = useNavigate();
  const [notifyIsOpen, setNotifyIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to control search dialog visibility
  const token = localStorage.getItem('access_token')
  const userAvatar = useSelector((state) => state.account.user.thumbnailURL);
  console.log(userAvatar)

  // Variants for overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  // Variants for dialog
  const dialogVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { y: 50, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-full top-0 left-0 z-[40]">
      {/* Header Container */}
      <div className="lg:px-10 py-4 px-7 flex justify-between items-center bg-white shadow-md relative">
        {/* Sidebar Toggle Button */}
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen((prevState) => !prevState)} // Toggle sidebar open/close
            className="text-4xl text-mainColor"
          >
            <IoIosMenu />
          </button>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:flex lg:ml-10 flex-1">
          <Search />
        </div>

        {/* Notification and Profile Section */}
        <div className="flex items-center space-x-10">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)} // Open search dialog on button click
            className="lg:hidden text-3xl text-mainColor"
          >
            <IoIosSearch />
          </button>

          {/* Notification Section */}
          <div
            onMouseEnter={() => setNotifyIsOpen(true)}
            onMouseLeave={() => setNotifyIsOpen(false)}
            className="relative text-3xl font-extrabold"
          >
            <PiBellSimpleRinging />
            <span className="absolute top-0 right-0 text-[0.6rem] bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {mockNotifications.length}
            </span>
            {/* Dropdown Menu for Notifications */}
            {notifyIsOpen && (
              <NotificationMenu notifications={mockNotifications} />
            )}
          </div>

          {/* User Avatar */}
          <div className="relative">
            <img
              className="h-12 w-12 rounded-full object-cover cursor-pointer"
              src={userAvatar}
              onClick={() => {
                if (!token) {
                    navigate("/login")
                } else {
                    navigate("/profile")
                }
              }}
              alt="User Avatar"
            />
          </div>
        </div>
      </div>

      {/* Search Dialog (Appears on mobile when the search button is clicked) */}
      {isSearchOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center"
          onClick={() => setIsSearchOpen(false)} // Close when clicking on overlay
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
        >
          {/* Prevent closing when clicking inside the search box */}
          <motion.div
            className="bg-white p-4 w-80 rounded-md"
            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dialogVariants}
          >
            <Search className="w-full" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default memo(Header);
