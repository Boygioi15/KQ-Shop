import "../commonStyle.css"
import "./style.css"
import { ErrorModal, SuccessModal } from "../../../reusable-components/Modal/Modal";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useLoading } from "../../../contexts/LoadingContext";
import { Input } from "../../../components/Input";
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

import validator from "validator";

export default function ChangePasswordPage(){
    const {showLoading, hideLoading} = useLoading();
    const navigate = useNavigate();
    const {userDetail, fetchUserDetail, signOut} = useAuth();
    const [Verify_isErrorModalOpen, setVerify_isErrorModalOpen] = useState(false); 
    
    const [Update_isErrorModalOpen, setUpdate_isErrorModalOpen] = useState(false); 
    const [Update_errorMsg, setUpdate_errorMsg] = useState(""); 
    const [Update_isSuccessModalOpen, setUpdate_isSuccessModalOpen] = useState(false);
    
    const [Validate_isErrorModalOpen, setValidate_isErrorModalOpen] = useState(false); 
    const [Validate_errorMsg, setValidate_errorMsg] = useState(""); 

    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showCNewPassword, setShowCNewPassword] = useState(false)
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""

    }) 
    useEffect(()=>{console.log("Form data: " + JSON.stringify(formData)),[formData]})
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            signOut();
            setVerify_isErrorModalOpen(true);
        }
    }, [userDetail]);

    const validateForm = () =>{
        if(formData.oldPassword.trim()===""|| formData.newPassword.trim()==="" ||formData.confirmNewPassword.trim()==""){
            setValidate_errorMsg("Vui lòng nhập đầy đủ các trường")
            setValidate_isErrorModalOpen(true);
            return false;
        }
        if(formData.newPassword.length<7){
            setValidate_errorMsg("Mật khẩu mới phải có độ dài lớn hơn 7")
            setValidate_isErrorModalOpen(true);
            return false;
        }
        if(formData.newPassword.trim()!=formData.confirmNewPassword.trim()){
            setValidate_errorMsg("Mật khẩu mới và xác nhận mật khẩu mới không khớp")
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
            const response = await axios.patch('http://localhost:8000/api/user/password',formData,
              {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            fetchUserDetail();
            setUpdate_isSuccessModalOpen(true);
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: ""
        
            })
          }catch (error) {
            if (error.response) {
                setUpdate_errorMsg(error.response.data.message);
                setUpdate_isErrorModalOpen(true);
                throw new Error(error.response.data.message);
            } else if (error.request) {
                setUpdate_isErrorModalOpen(true);
                throw new Error(error.response.data.message);
            } else {
                setUpdate_isErrorModalOpen(true);
                throw new Error(error.response.data.msg);
            }
        }finally{
            hideLoading();
        }
    }
    return(
        <>
            <div style={{height:"500px"}}className="User-space-form AccountInfoPage">
                <div>
                    <h2>Đổi mật khẩu</h2>
                    <h3 style={{marginTop:"-20px"}}>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</h3>
                </div>
                <hr />
                <div className="content">
                    <div className="form">
                        <label>Mật khẩu cũ</label>
                        <div className="relative">
                            <Input
                                name="password"
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Mật khẩu cũ"
                                value={formData.oldPassword}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, oldPassword: e.target.value }))
                                }
                                className="pr-10" 
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        <label>Mật khẩu mới</label>
                        <div className="relative">
                            <Input
                                name="password"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Mật khẩu mới"
                                value={formData.newPassword}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, newPassword: e.target.value }))
                                }
                                className="pr-10" 
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        <label>Xác nhận mật khẩu mới</label>
                        <div className="relative">
                            <Input
                                name="password"
                                type={showCNewPassword ? "text" : "password"}
                                placeholder="Xác nhận mật khẩu mới"
                                value={formData.confirmNewPassword}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, confirmNewPassword: e.target.value }))
                                }
                                className="pr-10" 
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                onClick={() => setShowCNewPassword(!showCNewPassword)}
                            >
                                {showCNewPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                        <div/>
                        <button onClick={handleSubmit} style={{fontSize: "16px", width:"200px"}}className="standard-button-1">
                            Xác nhận
                        </button>
                    </div>
                </div>
                
            </div>
            <ErrorModal 
                isOpen={Validate_isErrorModalOpen} 
                onClose={() => {
                    setValidate_isErrorModalOpen(false)
                }} 
                message={Validate_errorMsg} 
            />
            <ErrorModal 
                isOpen={Verify_isErrorModalOpen} 
                onClose={() => {
                    setVerify_isErrorModalOpen(false)
                    navigate('/auth')
                }} 
                message={"Xác thực người dùng thất bại. Vui lòng đăng nhập lại"} 
            />
            <ErrorModal 
                isOpen={Update_isErrorModalOpen} 
                onClose={() => {
                    setUpdate_isErrorModalOpen(false)
                }} 
                message={"Đổi mật khẩu thất bại. Lỗi: " + Update_errorMsg + ". Vui lòng thử lại!" } 
            />
            <SuccessModal 
                isOpen={Update_isSuccessModalOpen} 
                onClose={() => {
                    setUpdate_isSuccessModalOpen(false)
                }} 
                message={"Đổi mật khẩu thành công"} 
            />
        </>
        
    )
}