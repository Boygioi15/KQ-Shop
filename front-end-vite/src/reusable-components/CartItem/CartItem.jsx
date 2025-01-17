
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import { ErrorModal } from "../Modal/Modal";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { FaRegTrashCan } from "react-icons/fa6";

import "./style.css"
// Set a maximum length for the product name
const MAX_LENGTH = 28;
export default function CartItem({itemId, selected, onSelectedChange, quantity, thumbnailURL, productName, colorName, sizeName, price, inStorage}){
    //console.log(selected)
    const {handleUpdateCartItemQuantity, removeItemFromCart} = useCart();

    const [UpdateAmount_IsErrorModalOpen,setUpdateAmount_IsErrorModalOpen] = useState(false);
    const [UpdateAmount_ErrorMessage,setUpdateAmount_ErrorMessage] = useState(false);

    const shortenedProductName = productName.length > MAX_LENGTH ? productName.slice(0, MAX_LENGTH) + '...' : productName;
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
        <div className="CartItem">
            <input 
                type="checkbox"
                checked={selected}
                onClick={onSelectedChange}
                className="standard-checkbox-1"
            />
            <div className="image">
                <img src={thumbnailURL}/>
            </div>
            
            <div className="info"> 
                <div style={{display:"flex",flexDirection:"column",gap:"5px",width:"250px"}}>
                    <div style={{width:"500px"}} className="brief-product-name-font">{shortenedProductName}</div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}
                    className="small-font">
                        <div>
                            {`${colorName} / ${sizeName}`}
                        </div>
                        <QuantitySelector amount={quantity} onAmountChange={handleQuantityChange} limit={inStorage}/>
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
                    <div><FaRegTrashCan onClick= {()=>removeItemFromCart(itemId)} className="small-icon-1"/></div>
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