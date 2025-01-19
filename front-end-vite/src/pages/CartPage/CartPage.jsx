import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext"
import "./style.css"
import CartShop from "../../reusable-components/CartShop/CartShop";
export default function CartPage({className}){
    const {cartDetail, fetchCartDetail, toggleSelectedOfCartShop} = useCart();
    const [localCartDetail, setLocalCartDetail] = useState(null);
    useEffect(()=>{
        if (!cartDetail) {
            fetchCartDetail();
        }
    },[]);
    useEffect(()=>{
        if(cartDetail){
            setLocalCartDetail(cartDetail);
        }
    },[cartDetail])
    if(!localCartDetail || !localCartDetail.shopGroup || !localStorage.getItem("token")){
        return;
    }
    return(
        //wrapper
        <div className={`${className? className: ''}`}>
            <div className="CartPage">
                <div className="CartShopList">
                    {localCartDetail.shopGroup.map((cartShop)=>{
                        return (
                            <CartShop 
                                key={cartShop.shopRef}
                                shopName={cartShop.shopName}
                                shopRef={cartShop.shopRef}
                                selected={cartShop.selected}
                                onSelectedChange={()=>toggleSelectedOfCartShop(cartShop.shopRef,!cartShop.selected)}
                                itemList={cartShop.itemList}
                            />
                        )
                    })}
                </div>
                <div>
                    
                </div>
            </div>  
        </div>  
    )
}