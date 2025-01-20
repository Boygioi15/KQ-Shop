import "./style.css"
import { NotifyModal } from "../../reusable-components/Modal/Modal"
import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext";
import AddressModal from "../UserSpacePages/AddressPage/AddressModal";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useCart } from "../../contexts/CartContext";
import payOS from "../../assets/payOS.svg"
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoading } from "../../contexts/LoadingContext";

export default function TransactionPage(){
    //if user doesn't have address, prompt a note and then an address dialog that is unclosable
    const [Address_isNotifyModalOpen, setAddress_IsNotifyModalOpen]=useState(false);
    const [Address_isModalOpen, setAddress_isModalOpen] = useState(false);
    const {userDetail, fetchUserDetail} = useAuth();
    const [selectedAddress, setSelectedAddress] = useState(null)
    const {cartDetail, fetchCartDetail, toggleSelectedOfCartShop,toggleSelectAll} = useCart();
    const [localCartDetail, setLocalCartDetail] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(0)
    const {showLoading,hideLoading} = useLoading();
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
    useEffect(()=>{
        if(!userDetail){
            fetchUserDetail();
        }
        if(userDetail){
            console.log(userDetail)
            if(userDetail.addresses.length<1){
                setAddress_IsNotifyModalOpen(true);
            }else{
                setSelectedAddress(userDetail.addresses[0])
            }
        }
    },[Address_isModalOpen,userDetail])
    const handlePaymentSubmit = async () =>{
        if(paymentMethod===0){
            alert("Bạn chưa chọn phương thức thanh toán!")
            return;
        }
        const token=localStorage.getItem("token")
        if(paymentMethod===3){
            showLoading();
            const response = await axios.post(
                "http://localhost:8000/api/payment/create-payment/payOS",{},{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            hideLoading();
            console.log("Res:")
            console.log(response)
            window.location.href="https://pay.payos.vn/web/0df2c02b8f59486aa9efb189cfc4b48a"
        }
        else if(paymentMethod===2){
            showLoading();
            const response = await axios.post(
                "http://localhost:8000/api/payment/create-payment/momo",{},{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.href=response.data
            hideLoading();
        }
    }
    if(!localCartDetail){
        return;
    }   
    return(
        <div className="USL-wrapper">
            <div className="TransactionPage">
                <div className="CheckOutPageForm">
                    <label className="modal-product-name-font">
                        Địa chỉ nhận hàng
                    </label>
                    <hr />
                    <div style={{marginLeft:"5px", display:"flex",flexDirection:"column",gap:"5px"}}>
                        <label className="brief-product-name-font" >
                            Địa chỉ được chọn:
                        </label>
                        {selectedAddress && <AddressBlockV2 address={selectedAddress} />}
                        <label style={{marginTop:"5px"}} className="brief-product-name-font">
                            Danh sách địa chỉ:
                        </label>
                        <div className="AddressList">
                            {userDetail && userDetail.addresses && selectedAddress && 
                                userDetail.addresses.map((address)=><AddressBlockV2 address={address} 
                                selected={address._id===selectedAddress._id}
                                onSelected={()=>setSelectedAddress(address)}
                                />) 
                            }
                        </div>
                    </div>
                    
                </div>
                <div>
                    <div className="CheckOutPageForm">
                        <label className="modal-product-name-font">
                            Tóm tắt hóa đơn
                        </label>
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
                            <label className="brief-product-name-font">Giá cuối cùng: </label>
                            <label className="brief-product-price-font">{(+localCartDetail.discountedPrice).toLocaleString('vi-VN')+'đ'}</label>
                        </div>
                    </div>  
                    <div className="CheckOutPageForm" style={{display:"flex",flexDirection:"column",gap:"10px",marginTop:"10px"}}>
                        <label className="modal-product-name-font">
                            Chọn phương thức thanh toán
                        </label>
                        <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}>
                            <input className="RadioInput" type="radio" id="nu" name="paymentMethod" value="1" 
                                onChange={(e) => setPaymentMethod(1)} 
                                checked={paymentMethod===1}
                            />
                            <img style={{height:"40px",width:"45px"}}src="https://img.ltwebstatic.com/images3_pi/2024/06/25/54/17193084623789a558f934389f07b55391e120d31a.webp"/>
                            <label>Tiền mặt</label>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}>
                            <input className="RadioInput" type="radio" id="nu" name="paymentMethod" value="2" 
                                onChange={(e) => setPaymentMethod(2)} 
                                checked={paymentMethod===2}
                            />
                            <img style={{height:"40px",width:"40px"}}src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"/>
                            <label>Momo</label>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}>
                            <input className="RadioInput" type="radio" id="nu" name="paymentMethod" value="3" 
                                onChange={(e) => setPaymentMethod(3)} 
                                checked={paymentMethod===3}
                            />
                            <img style={{height:"40px",width:"40px"}}src={payOS}/>
                            <label>PayOS</label>
                        </div>
                        <button onClick={handlePaymentSubmit}className="standard-button-2" style={{width:"100%"}}>
                            THANH TOÁN NGAY
                        </button>
                    </div>
                    
                </div>
                <NotifyModal 
                    message="Bạn chưa đăng kí địa chỉ nào trên hệ thống. Vui lòng đăng kí một địa chỉ trước khi thanh toán"
                    isOpen={Address_isNotifyModalOpen}
                    onClose={()=>{
                        setAddress_IsNotifyModalOpen(false)
                        setAddress_isModalOpen(true);
                    }}
                />
                {Address_isModalOpen &&<AddressModal isOpen={Address_isModalOpen} 
                    onClose={()=>{
                        setAddress_isModalOpen(false)
                        setAddress_IsNotifyModalOpen(false)
                    }}
                />}
            </div>
        </div>
        
    )
}

function AddressBlockV2({address,selected, onSelected}){
    return(
        <div onClick={onSelected} className={`AddressBlock ${selected? "AddressBlockV2V" : "AddressBlockV2N"}`}>
            <div className="info">
                <div>
                    <span className="address-block-name-font">{address.receiverName}</span>
                    <span className="address-block-phone-font"> | {address.receiverPhone}</span>
                    {address.default &&  " - "}
                    {address.default && <span style={{marginLeft:"5px"}}className="defaultBlock">
                        Mặc định
                    </span>
                    }
                </div>
                <div className="address-block-phone-font">
                    Địa chỉ: {address.receiverAddress}
                </div>
                {selected &&<IoCheckmarkCircleSharp style={{position:"absolute",right:"5px",top:"18px",fontSize:"25px"}}/>}
            </div>
        </div>
    )
}