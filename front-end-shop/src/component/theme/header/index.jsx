import { useState, useEffect, useRef } from "react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import SideBar from "./component/SideBar";
import Search from "../../SearchBox";
import { AiOutlineHeart } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { PiBellSimpleRinging } from "react-icons/pi";
import ProfileNavBar from "../../../component/ProfileNav";
import DropdownMenu from "./component/DropdownMenu";
import { Link } from "react-router-dom";
import NotificationMenu from "../../Notification/notificationMenu";

const Header = () => {
  const Links = [
    { name: "About", link: "/" },
    { name: "Contact", link: "/profile" },
  ];

  const userAvatar = useSelector((state) => state.account.user.avatar);
  const userName = useSelector((state) => state.account.user.name);

  const mockNotifications = [
    { message: "Your order has been shipped.", time: "2 minutes ago" },
    { message: "New message from customer support.", time: "1 hour ago" },
    { message: "Product back in stock: iPhone 13", time: "3 hours ago" },
    { message: "Flash Sale starting soon!", time: "1 day ago" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [notifyIsOpen, setNotifyIsOpen] = useState(false);
  const headerRef = useRef(null);

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Update header height when component mounts or on resize
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div className="w-full top-0 left-0 z-[40] sticky">
        <div
          className="py-4 lg:flex justify-between items-center bg-[#f3f4f6] relative"
          ref={headerRef} // Attach ref to the header
        >
          {/* Logo and Menu */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <a href="/" className="font-bold text-3xl">
              AppleHouse
            </a>
            {/* Desktop Dropdown Menu */}
            <div className="hidden lg:block">
              <DropdownMenu headerHeight={headerHeight} />
            </div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-7 h-7 lg:hidden cursor-pointer"
            >
              <Bars3BottomRightIcon />
            </div>
          </div>

          <div className="mt-4 lg:hidden">
            <Search />
          </div>

          {/* Desktop Search */}
          <Search className="hidden lg:flex lg:ml-10" />

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex pl-9 lg:pl-0 justify-end items-center space-x-8 ml-4">
            {Links.map((link, index) => (
              <li key={index} className="font-extralight my-7 lg:my-0 text-lg">
                <a href={link.link}>{link.name}</a>
              </li>
            ))}
            <li className="font-extrabold text-3xl my-7 lg:my-0">
              <Link to="/favorites">
                <AiOutlineHeart />
              </Link>
            </li>
            <li className="font-extrabold text-3xl my-7 lg:my-0 relative">
              <Link to="/cart">
                <IoCartOutline />
                <span className="absolute top-0 right-0 text-[0.6rem] bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  3
                </span>
              </Link>
            </li>
            <li
              onMouseEnter={() => setNotifyIsOpen(true)}
              onMouseLeave={() => setNotifyIsOpen(false)}
              className="font-extrabold text-3xl my-7 lg:my-0 relative"
            >
              <Link to="/">
                <PiBellSimpleRinging />
                <span className="absolute top-0 right-0 text-[0.6rem] bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {mockNotifications.length}
                </span>
              </Link>
              {/* Hiển thị dropdown khi hover */}
              {notifyIsOpen && (
                <NotificationMenu notifications={mockNotifications} />
              )}
            </li>
            {/* Profile Section with Dropdown */}
            <li className="my-7 lg:my-0">
              <ProfileNavBar userAvatar={userAvatar} userName={userName} />
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default Header;
