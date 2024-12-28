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

export default function AddressModal({addressData, isOpen, onClose}){
    console.log("HI")
    const isEdit = addressData;
    const {showLoading, hideLoading} = useLoading();
    const navigate = useNavigate();
    const {userDetail, fetchUserDetail, signOut} = useAuth();
    const [formData, setFormData] = useState({
        receiverName: (addressData && addressData.receiverName) || "",
        receiverPhone: (addressData && addressData.receiverPhone) || "",
        receiverAddress: (addressData && addressData.receiverAddress) || ""
    })
    
    const [Submit_isSuccessModalOpen, setSubmit_isSuccessModalOpen] = useState(false); 
    const [Submit_isErrorModalOpen, setSubmit_isErrorModalOpen] = useState(false); 
    const [Submit_errorMsg, setSubmit_errorMsg] = useState(""); 
    
    const [Validate_isErrorModalOpen, setValidate_isErrorModalOpen] = useState(false); 
    const [Validate_errorMsg, setValidate_errorMsg] = useState(""); 
    
    useEffect(()=>{
        if(addressData){
            setFormData({
                receiverName: addressData.receiverName,
                receiverPhone: addressData.receiverPhone,
                receiverAddress: addressData.receiverAddress
            })
        }
    },[])
    if(!isOpen){
        return null;
    }
    const validateForm = () => {
        if(!formData.receiverName || !formData.receiverAddress || !formData.receiverPhone){
            setValidate_errorMsg("Vui lòng nhập đầy đủ các trường");
            setValidate_isErrorModalOpen(true);
            return false
        }
        const phoneRegex = /^\d{10}$/;
        if (formData.receiverPhone && formData.receiverPhone!=="" && !phoneRegex.test(formData.receiverPhone)) {
            setValidate_errorMsg("Định dạng số điện thoại không hợp lệ")
            setValidate_isErrorModalOpen(true);
            return false;
        }
        return true;
    }
    const handleSubmit = async () =>{
        if(!validateForm()){
            return;
        }
        try {
            showLoading();
            if(!isEdit){
                await axios.post('http://localhost:8000/api/user/address',formData,
                    {headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }
            else{
                await axios.patch(`http://localhost:8000/api/user/address/${addressData._id}`,formData,
                    {headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }
            fetchUserDetail();
            setSubmit_isSuccessModalOpen(true);
          }catch (error) {
            console.log(error);
            if (error.response) {
                setSubmit_errorMsg(error.response.data.message);
                setSubmit_isErrorModalOpen(true);
                throw new Error(error.response.data.message);
            } else if (error.request) {
                setSubmit_errorMsg(error.response.data.message);
                setSubmit_isErrorModalOpen(true);
                throw new Error(error.response.data.message);
            } else {
                setSubmit_errorMsg(error.response.data.message);
                setSubmit_isErrorModalOpen(true);
                throw new Error(error.response.data.msg);
            }
        }finally{
            hideLoading();
        }
    }
    return(
        <div className="modal-overlay">
            <div className="AddressModal">
                <span className="modal-product-name-font">{isEdit? "Cập nhật địa chỉ" : "Thêm mới địa chỉ"}</span>
                <hr/>
                <div className="form">
                    <input
                        type="text"
                        value={formData.receiverName}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, receiverName: e.target.value }))
                        }
                        placeholder="Họ và tên"
                        className="TextInput"
                    />
                    <input
                        type="text"
                        value={formData.receiverPhone}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, receiverPhone: e.target.value }))
                        }
                        placeholder="Số điện thoại"
                        className="TextInput"
                    />
                    <textarea
                        value={formData.receiverAddress}
                        type="text"
                        placeholder="Địa chỉ cụ thể"
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, receiverAddress: e.target.value }))
                        }
                        style={{ gridColumn: "span 2" }}
                    />
                </div>
                <div className="operation">
                    <button className= "cancel-button" onClick={onClose}>
                        Trở về
                    </button>
                    <button style={{fontSize:"16px", padding: "5px 15px"}}className= "small-font standard-button-2 "onClick={handleSubmit}>Xác nhận</button>
                </div>      
            </div>

            <ErrorModal 
                isOpen={Validate_isErrorModalOpen} 
                onClose={() => {
                    setValidate_isErrorModalOpen(false)
                }} 
                message={`Dữ liệu không hợp lệ. ${Validate_errorMsg}. Vui lòng nhập lại`} 
            />
            <ErrorModal 
                isOpen={Submit_isErrorModalOpen} 
                onClose={() => {
                    setSubmit_isErrorModalOpen(false)
                }} 
                message={"Lỗi từ server: " + Submit_errorMsg} 
            />
            <SuccessModal 
                isOpen={Submit_isSuccessModalOpen} 
                onClose={() => {
                    setSubmit_isSuccessModalOpen(false)
                    onClose();
                }} 
                message={(isEdit? "Cập nhật" : "Thêm mới") + " địa chỉ thành công!"} 
            />

        </div>
    )
}