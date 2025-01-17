import { FaStore } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import "./style.css"
import CartItem from "../CartItem/CartItem";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import { ErrorModal } from "../Modal/Modal";
import CartItemV2 from "../CartItem/CartItemV2";

export default function CartShopV2({shopRef, shopName, selected, itemList, onSelectedChange}){
    const {toggleSelectedOfCartItem} = useCart();
    return(
        <div style={{width:"100%"}} className="CartShop">
            <div className="Title modal-product-normal-font">
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
                        <CartItemV2 
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