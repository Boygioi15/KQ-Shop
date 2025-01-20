import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import CartShop from "../../reusable-components/CartShop/CartShop";
import "./style.css"
import CartShopV2 from "../../reusable-components/CartShop/CartShopV2";
import payOS from "../../assets/payOS.svg"
import { useNavigate } from "react-router-dom";
export default function CartCheckoutPage(){
    const {cartDetail, fetchCartDetail, toggleSelectedOfCartShop,toggleSelectAll} = useCart();
    const [localCartDetail, setLocalCartDetail] = useState(null);
    const navigate = useNavigate()
    useEffect(()=>{
        if (!cartDetail) {
            fetchCartDetail();
        }
    },[cartDetail]);
    useEffect(()=>{
        if(cartDetail){
            setLocalCartDetail(cartDetail);
        }
    },[cartDetail])
    if(!localCartDetail){
        return;
    }    
    return(
        <div className="CartCheckoutPage">
            <div>
                <div className="CartDetail">
                    <div className="CheckOutPageForm AllItem">
                        <input 
                            type="checkbox"
                            checked={localCartDetail.selected}
                            onClick={()=>toggleSelectAll(!localCartDetail.selected)}
                            className="standard-checkbox-1"
                        />
                        <label className="modal-product-name-font">
                            Toàn bộ sản phẩm ({localCartDetail.numberOfItem})
                        </label>
                    </div>
                    {localCartDetail.shopGroup.map((cartShop)=>{
                        return (
                            <div style={{marginTop:"10px"}} className="CheckOutPageForm">
                                <CartShopV2 
                                    key={cartShop.shopRef}
                                    shopName={cartShop.shopName}
                                    shopRef={cartShop.shopRef}
                                    selected={cartShop.selected}
                                    onSelectedChange={()=>toggleSelectedOfCartShop(cartShop.shopRef,!cartShop.selected)}
                                    itemList={cartShop.itemList}                    
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <div className="OrderSummary CheckOutPageForm">
                    <div className="modal-product-normal-font">
                        Tóm tắt hóa đơn
                    </div>
                    <div className="brief-product-shop-font">
                        Proceed to apply discounts and account assets then confirm the final price.
                    </div>
                    <div style={{display:"flex",flexDirection:"row",gap:"3px",flexWrap:"wrap"}}>
                        {localCartDetail.shopGroup.map((group)=>group.itemList.map((item)=><OrderImageSummary cartItem={item}/>))}
                    </div>
                    <div className="price-table">
                        <label className="left-cell brief-product-name-font">Giá gốc: </label>
                        <label className="right-cell brief-product-price-font">{(+localCartDetail.rootPrice).toLocaleString('vi-VN')+'đ'}</label>
                        <label className="left-cell ">Chương trình sự kiện: </label>
                        <label className="right-cell brief-product-name-font">-{(+localCartDetail.promotionDiscount).toLocaleString('vi-VN')+'đ'}</label>
                        <label className="left-cell">Voucher khuyến mãi: </label>
                        <label className="right-cell brief-product-name-font">-{(+localCartDetail.voucherDiscount).toLocaleString('vi-VN')+'đ'}</label>
                    </div>
                    <hr/>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:"5px"}}>
                        <label className="modal-product-name-font">Giá cuối cùng: </label>
                        <label style={{fontSize:"32px"}}className="modal-product-price-font">{(+localCartDetail.discountedPrice).toLocaleString('vi-VN')+'đ'}</label>
                    </div>
                    <button onClick={()=>navigate("/transaction")}className="standard-button-1" style={{width:"100%"}}>
                        THANH TOÁN NGAY
                    </button>
                </div>
                <div style={{marginTop:"20px",display:"flex",flexDirection:"column",gap:"20px",paddingTop:"20px",paddingBottom:"20px"}}className="AcceptedPaymentMethod CheckOutPageForm">
                    <label className="modal-product-normal-font">
                        Chúng tôi chấp nhận các phương thức thanh toán
                    </label>
                    <hr/>   
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center", justifyContent:"center",gap:"10px",flexWrap:"wrap"}}>
                        <img style={{height:"95px",width:"120px"}}src="https://img.ltwebstatic.com/images3_pi/2024/06/25/54/17193084623789a558f934389f07b55391e120d31a.webp"/>
                        <img style={{height:"100px",width:"100px"}} src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"/>
                        <img style={{height:"100px",width:"200px"}} src={payOS} />
                    </div>
                </div>
            </div>
        </div>
    )
}
function OrderImageSummary({cartItem}){
    const {toggleSelectedOfCartItem} = useCart();
    return(
        <div style={{position:"relative",width:"80px",height:"80px"}}>
            <input 
                type="checkbox"
                checked={cartItem.selected}
                onClick={()=>toggleSelectedOfCartItem(cartItem._id)}
                className="standard-checkbox-1"
                style={{position:"absolute",top:"5px",right:"5px"}}
            />
            <img src={cartItem.productThumbnailURL} style={{width:"80px",height:"80px",objectFit:"cover"}}/>
            
        </div>
    )
}
