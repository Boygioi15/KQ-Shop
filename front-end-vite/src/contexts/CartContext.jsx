import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create the CartContext
const CartContext = createContext();

// CartProvider Component to wrap your app and provide cart context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartID, setCartID] = useState(localStorage.getItem("cartID"));

  const requestCartDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/cart/${cartID}`
      );
      if (response && response.data) {
        setCart(response.data); // Set the cart details in state
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };
  const requestNewAnonymousCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/cart/anonymous"
      );
      if (response && response.data) {
        localStorage.setItem("cartID", response.data._id);
        console.log("set new cart id in local storage");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch cart details when cartID is available
  useEffect(() => {
    if (!cartID) {
      requestNewAnonymousCart();
    }
  }, [cartID]);
  useEffect(()=>{
    if(cartID){
      requestCartDetail();
    }
  },[cartID])
  // Provide cart and setter to the rest of the app
  return (
    <CartContext.Provider value={{ cart, setCart, cartID, setCartID }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the CartContext
export const useCart = () => useContext(CartContext);
