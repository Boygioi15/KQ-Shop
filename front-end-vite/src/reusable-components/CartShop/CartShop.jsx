import { FaStore } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import "./style.css"
import CartItem from "../CartItem/CartItem";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import { ErrorModal } from "../Modal/Modal";

export default function CartShop({shopRef, shopName, selected, itemList, onSelectedChange}){
    const {toggleSelectedOfCartItem} = useCart();
    return(
        <div className="CartShop">
            <div className="Title brief-product-name-font">
                <input
                    type="checkbox"
                    onClick={onSelectedChange}
                    checked={selected}
                    style={{marginTop:"2px"}}
                    className="standard-checkbox-1"
                />
                <FaStore style={{marginTop:"2px",marginLeft: "5px"}}/>
                <a href={`/`} className="">
                    {shopName}
                </a>
                <IoIosArrowForward style={{marginTop:"3px"}}/>
            </div>
            <div className="CartItemList">
                {itemList && itemList.map((cartItem)=>{
                    return(
                        <CartItem 
                            key={cartItem._id}
                            itemId={cartItem._id}
                            selected={cartItem.selected}
                            onSelectedChange={()=>toggleSelectedOfCartItem(cartItem._id)}
                            thumbnailURL={cartItem.productThumbnailURL}
                            productName={cartItem.productName}
                            colorName={cartItem.productTypeName}
                            sizeName={cartItem.productTypeDetailName}
                            price={cartItem.productTypeDetailPrice}
                            quantity={cartItem.quantity}
                            inStorage={cartItem.productTypeDetailInStorage}
                        />
                    )
                })}
            </div>
        </div>
    )
}