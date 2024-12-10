import React, {useState, useEffect} from "react";
import { redirect, useNavigate } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from "axios";

import iconStar from "../../assets/images/iconStar.png";
import './style.css'
import ProductModal from "../ProductModal/ProductModal";
export default function BriefProductCard({
  id,
  name,
  price,
  shop,
  initImgURL,
  hoverImgURL,
}) {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(initImgURL);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleMouseEnter = () => {
    if (hoverImgURL) {
      setCurrentImage(hoverImgURL);
    }
  };
  const handleMouseLeave = () => {
    setCurrentImage(initImgURL);
  };
  const handleOpenProductModal = () => {
    if(isModalOpen){
      setIsModalOpen(false); 
      return;
    }
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseProductModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  return (
    <div className="BriefProductCard">
      <img src={currentImage} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        navigate(`/product/${id}`);
      }}
      />
      <div className="briefDescription">
        <div className="brief-product-name-font name">{name}</div >
        <div className="brief-product-shop-font">{shop}</div >
        <div className="brief-product-price-font">{(+price).toLocaleString('vi-VN')+'đ'}</div >
      </div>
      <button onClick={handleOpenProductModal} className="addToCart"><MdOutlineAddShoppingCart /></button>
      {isModalOpen && <ProductModal productID={id} handleOnClose={handleCloseProductModal}/>}
    </div>
  );
}
