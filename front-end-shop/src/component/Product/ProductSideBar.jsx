import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ProductInfo from "./ProductInfo";
import "../../style/sideBar.css"; // Import CSS chung

const ProductSideBar = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "overlay-visible" : "overlay-hidden"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sidebar-header">
          <h3 className="sidebar-title">Product Details</h3>
          <IoCloseOutline
            onClick={() => setIsOpen(false)}
            className="close-icon"
          />
        </div>
        <ProductInfo />
      </div>
    </>
  );
};

export default ProductSideBar;
