import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext"
import "./style.css"
import CartShop from "../../reusable-components/CartShop/CartShop";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function CartPage({className}){
    const {cartDetail, fetchCartDetail, toggleSelectedOfCartShop} = useCart();
    const [localCartDetail, setLocalCartDetail] = useState(null);
    const {signOut} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCart = async () => {
            if(localStorage.getItem("token")){
                if (!cartDetail) {
                    try {
                        await fetchCartDetail();
                    } catch (error) {
                        signOut();
                        navigate("/auth")
                    }
                }
            }    
        };
    
        fetchCart();
    }, []); // Run only once when the component mounts.
    
    useEffect(()=>{
        if(cartDetail){
            setLocalCartDetail(cartDetail);
        }
    },[cartDetail])
    //useEffect(()=>{console.log(localCartDetail)},[localCartDetail])
    if(!localCartDetail || !localStorage.getItem("token")){
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