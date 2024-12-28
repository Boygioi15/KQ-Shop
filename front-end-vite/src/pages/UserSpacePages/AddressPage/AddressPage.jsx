import "../commonStyle.css"
import "./style.css"
import { ErrorModal, SuccessModal } from "../../../reusable-components/Modal/Modal";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useLoading } from "../../../contexts/LoadingContext";
import { FaPlus  } from "react-icons/fa6";


import validator from "validator";
import AddressModal from "./AddressModal";

export default function AddressPage(){
    const {showLoading, hideLoading} = useLoading();
    const navigate = useNavigate();
    const {userDetail, fetchUserDetail, signOut} = useAuth();
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setVerify_isErrorModalOpen(true);
        }

        if (!userDetail) {
            fetchUserDetail().catch((error) => {
                signOut();
                setVerify_isErrorModalOpen(true);
            });
        }
    }, [userDetail]);
    useEffect(()=>{console.log(selectedAddress)},[selectedAddress])
    return(
        <>
            <div style={{height:"500px", gap: "5px"}}className="User-space-form AddressPage" >
                <div className="title">
                    <h2>Địa chỉ của tôi</h2>
                    <button onClick={()=>setIsShowModal(true)} className="modal-product-normal-font standard-button-2">
                        <FaPlus />
                        Thêm địa chỉ mới
                    </button>
                </div>
                <hr />
                <div className="content">
                    <h3 className="modal-product-normal-font">Danh sách địa chỉ</h3>
                    <div className="addressList">
                        {userDetail && userDetail.addresses &&
                            (()=>{
                                const result = [];
                                let addresses = userDetail.addresses;
                                const defaultAddress = addresses.find((address)=>address.default);
                                addresses = addresses.filter((address)=>!address.default)
                                addresses.unshift(defaultAddress)
                                for(let i = 0; i<addresses.length; i++){
                                    if(i>0){
                                        result.push(<hr/>)
                                    }                              
                                    result.push(<AddressBlock key={addresses[i]._id} address={addresses[i]} flag={true}
                                        onUpdate={()=>{
                                            setSelectedAddress(addresses[i])
                                            setIsShowModal(true)
                                        }}
                                    />)
                                }
                                return result
                            })()
                        }
                    </div>
                </div>
            </div>
            {isShowModal &&<AddressModal addressData={selectedAddress} isOpen={isShowModal} 
                onClose={()=>{
                    setSelectedAddress(null)
                    setIsShowModal(false)
                }}
            />}
        </>
        
    )
}

function AddressBlock({address, onUpdate}){
    const {fetchUserDetail} = useAuth();
    const {showLoading, hideLoading} = useLoading();

    const [Delete_isSuccessModalOpen, setDelete_isSuccessModalOpen] = useState(false); 
    const [SetDefault_isSuccessModalOpen, setSetDefault_isSuccessModalOpen] = useState(false); 
    
    const [errorFromServer, setErrorFromServer] = useState(""); 
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); 
    const handleDelete = async () =>{
        try{
            showLoading();
            await axios.delete(`http://localhost:8000/api/user/address/${address._id}`,
                {headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setDelete_isSuccessModalOpen(true);
          }
          catch (error) {
            if (error.response) {
                setErrorFromServer(error.response.data.message);
                setIsErrorModalOpen(true);
                throw new Error(error.response.data.message);
            } else if (error.request) {
                setErrorFromServer(error.response.data.message);
                setIsErrorModalOpen(true);
                throw new Error(error.response.data.message);
            } else {
                setErrorFromServer(error.response.data.message);
                setIsErrorModalOpen(true);
                throw new Error(error.response.data.msg);
            }
        }finally{
            hideLoading();
        }
    }
    const handleSetDefault = async () =>{
        try{
            showLoading();
            await axios.post(`http://localhost:8000/api/user/address/${address._id}/set-default`,{},
                {headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSetDefault_isSuccessModalOpen(true);
          }
          catch (error) {
            if (error.response) {
                setErrorFromServer(error.response.data.message);
                setIsErrorModalOpen(true);
                throw new Error(error.response.data.message);
            } else if (error.request) {
                setErrorFromServer(error.response.data.message);
                setIsErrorModalOpen(true);
                throw new Error(error.response.data.message);
            } else {
                setErrorFromServer(error.response.data.message);
                setIsErrorModalOpen(true);
                throw new Error(error.response.data.msg);
            }
        }finally{
            hideLoading();
        }
    }
    return(
        <div className="AddressBlock">
            <div className="info">
                <div>
                    <span className="address-block-name-font">{address.receiverName}</span>
                    <span className="address-block-phone-font"> | {address.receiverPhone}</span>
                </div>
                <div className="address-block-phone-font">
                    Địa chỉ: {address.receiverAddress}
                </div>
                {address.default && <span className="defaultBlock">
                    Mặc định
                </span>}
            </div>
            <div className="operation">
                <span style={{display: "flex", gap:"10px", justifyContent:"flex-end"}}>
                    <label onClick={onUpdate} style={{fontSize:"16px",cursor:"pointer"}} className="nav-link">Cập nhật</label>
                    {!address.default && <label onClick={handleDelete} style={{fontSize:"16px",cursor:"pointer"}} className="nav-link">Xóa</label>}
                </span>
                
                <button onClick={handleSetDefault} disabled={address.default}>Thiết lập mặc định</button>
            </div>
            <ErrorModal 
                isOpen={isErrorModalOpen} 
                onClose={() => {
                    setIsErrorModalOpen(false)
                }} 
                message={"Lỗi từ server: " + errorFromServer} 
            />
            <SuccessModal 
                isOpen={Delete_isSuccessModalOpen} 
                onClose={() => {
                    setDelete_isSuccessModalOpen(false)
                    fetchUserDetail();
                }} 
                message={"Xóa địa chỉ thành công!"} 
            />
            <SuccessModal 
                isOpen={SetDefault_isSuccessModalOpen} 
                onClose={() => {
                    setSetDefault_isSuccessModalOpen(false)
                    fetchUserDetail();
                }} 
                message={"Đặt địa chỉ mặc định thành công!"} 
            />
        </div>
    )
}