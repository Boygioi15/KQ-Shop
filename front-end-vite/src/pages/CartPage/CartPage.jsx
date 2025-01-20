import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext"
import "./style.css"
import CartShop from "../../reusable-components/CartShop/CartShop";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function CartPage({className}){
    const {cartDetail, fetchCartDetail, toggleSelectedOfCartShop, toggleSelectAll} = useCart();
    const [localCartDetail, setLocalCartDetail] = useState(null);
    const navigate = useNavigate();
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
                <div >
                    <hr/>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between", marginTop:"10px",marginBottom:"10px"}}>
                        <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                            <input 
                                type="checkbox"
                                checked={localCartDetail.selected}
                                onClick={()=>toggleSelectAll(!localCartDetail.selected)}
                                className="standard-checkbox-1"
                            />
                            <label className="brief-product-name-font">
                                Chọn tất cả
                            </label>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                            <label className="brief-product-name-font">
                                Tổng: 
                            </label>
                            <label className="brief-product-price-font">
                                {(+localCartDetail.rootPrice).toLocaleString('vi-VN')+'đ'}
                            </label>
                        </div>
                        
                    </div>
                    <button className="standard-button-2"style={{width:"100%"}} onClick={()=>navigate("/cart")}>
                        Xem giỏ hàng chi tiết
                    </button>
                </div>
            </div>  
        </div>  
    )
}