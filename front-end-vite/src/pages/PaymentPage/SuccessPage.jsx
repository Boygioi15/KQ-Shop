import React, { useEffect, useState } from "react";
import CheckoutMessage from "../../components/CheckoutMessage";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    alert("Thanh toán thành công! Chúc bạn sẽ có những trải nghiệm tốt với sản phẩm")
    navigate("/")
  })
  return <></>;
};

export default SuccessPage;
