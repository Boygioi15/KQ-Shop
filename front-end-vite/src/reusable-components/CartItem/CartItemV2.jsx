
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import { ErrorModal } from "../Modal/Modal";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { FaRegTrashCan } from "react-icons/fa6";

import "./style.css"
// Set a maximum length for the product name
export default function CartItemV2({itemId, selected, onSelectedChange, quantity, thumbnailURL, productName, colorName, sizeName, price, inStorage}){
    //console.log(selected)
    const {handleUpdateCartItemQuantity, removeItemFromCart} = useCart();

    const [UpdateAmount_IsErrorModalOpen,setUpdateAmount_IsErrorModalOpen] = useState(false);
    const [UpdateAmount_ErrorMessage,setUpdateAmount_ErrorMessage] = useState(false);

    const handleQuantityChange = async (newQuantity) => {
        try{
            await handleUpdateCartItemQuantity(itemId, newQuantity)
        }
        catch(error){
            console.log("HI")
            setUpdateAmount_ErrorMessage(error.message);
            setUpdateAmount_IsErrorModalOpen(true);
        }
    }
    return (
        <div style={{width:"100%"}}className="CartItem">
            <input 
                type="checkbox"
                checked={selected}
                onClick={onSelectedChange}
                className="standard-checkbox-1"
            />
            <div className="image">
                <img src={thumbnailURL}/>
            </div>
            
            <div style={{display:"flex",flexGrow:1,width:"unset",maxWidth:"unset",height:"100px"}}className="info"> 
                <div style={{display:"flex",flexDirection:"column",gap:"5px",width:"100%"}}>
                    <div className="brief-product-name-font">{productName}</div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}
                    className="small-font">
                        <div>
                            {`${colorName} / ${sizeName}`}
                        </div>
                    </div>
                </div>
                <div style={{position:"absolute",bottom:"0px", display:"flex",
                    flexDirection:"row",
                    width:"100%",
                    justifyContent:"space-between",
                    alignContent:"center"
                    }} 
                >
                    <div className="brief-product-price-font">{(+price).toLocaleString('vi-VN')+'đ'}</div>
                    <div style={{display:"flex",flexDirection:"row", gap: "5px", alignItems:"center"}}>
                        <QuantitySelector amount={quantity} onAmountChange={handleQuantityChange} limit={inStorage}/>
                        <FaRegTrashCan onClick= {()=>removeItemFromCart(itemId)} className="small-icon-1"/>
                    </div>
                </div>
            </div>
            <ErrorModal 
                isOpen={UpdateAmount_IsErrorModalOpen}
                message={UpdateAmount_ErrorMessage}
                onClose={()=>setUpdateAmount_IsErrorModalOpen(false)}
            />
        </div>
    )
}