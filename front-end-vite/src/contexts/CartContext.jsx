import { createContext, useState, useContext } from "react";
import { useLoading } from "./LoadingContext";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartDetail, setCartDetail] = useState(null);
  const {showLoading, hideLoading} = useLoading();
  const fetchCartDetail = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error('Không có token');
    }
    try {
      showLoading()
      const response = await fetch('http://localhost:8000/api/cart/cart-detail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status!==200 && response.status!==201 && response.status!==204){
        throw new Error("Không xác thực được người dùng")
      }
      else{
        const data = await response.json();
        setCartDetail(data);
      }
    }catch (error) {
      if (error.response) {
          alert(`Lấy thông tin giỏ hàng thất bại, lỗi: ` + error.response.data.msg);
          throw new Error(error.response.data.msg);
      } else if (error.request) {
          alert('Không nhận được phản hồi từ server');
          throw new Error(error.response.data.msg);
      } else {
          alert('Lỗi bất ngờ: ' + error.message);
          throw new Error(error.response.data.msg);
      }
    }
    finally{
      hideLoading()
    }
  };
  const addItemToCart = async (productIdentifier, quantity) => {
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error('Không có token');
    }
    try {
      showLoading()
      const response = await axios.post('http://localhost:8000/api/cart/items/add-item', {
        productIdentifier,
        quantity
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const success = response.data.success;
      if(success){
        fetchCartDetail();
      }
      else{
        const msg = response.data.msg;
        throw new Error(msg);
      }
    }finally{
      hideLoading()
    }
  }
  const removeItemFromCart = async (cartItemId) => {
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error('Không có token');
    }
    try {
      showLoading()
      const response = await axios.delete(`http://localhost:8000/api/cart/items/${cartItemId}/remove-item`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       console.log(response);
       await fetchCartDetail();
    }finally{
      hideLoading()
    }
  }
  const toggleSelectedOfCartItem = async (cartItemId) => {
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error('Không có token');
    }
    try {
      showLoading()
      const response = await axios.put(`http://localhost:8000/api/cart/items/${cartItemId}/toggle-select`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      fetchCartDetail();
    }finally{
      hideLoading()
    }
  }
  const toggleSelectedOfCartShop = async (shopRef, selection) => {
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error('Không có token');
    }
    try {
      showLoading()
      const response = await axios.put(`http://localhost:8000/api/cart/items/select-by-shop/${shopRef}`,{
        select: selection
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCartDetail();
    }finally{
      hideLoading()
    }
  }
  const toggleSelectAll = async (selection) => {
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error('Không có token');
    }
    try {
      showLoading()
      const response = await axios.put(`http://localhost:8000/api/cart/items/select-all`,{
        select: selection
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCartDetail();
    }
    catch(error){
      throw error;
    }
    finally{
      hideLoading()
    }
  }
  const handleUpdateCartItemQuantity = async (cartItemId,newQuantity) => {
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error('Không có token');
    }
    try {
      showLoading()
      const response = await axios.put(`http://localhost:8000/api/cart/items/${cartItemId}/update-amount`,{
        quantity: newQuantity
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const success = await response.data.success;
      if(success){
        await fetchCartDetail();
      }
      else{
        const msg = await response.data.msg;
        throw new Error(msg);
      }
    }finally{
      hideLoading()
    }
  }
  return (
    <CartContext.Provider value={{cartDetail, 
      fetchCartDetail, addItemToCart, removeItemFromCart,
      toggleSelectedOfCartItem, toggleSelectedOfCartShop, toggleSelectAll,
      handleUpdateCartItemQuantity
      }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => {
  return useContext(CartContext);
};
