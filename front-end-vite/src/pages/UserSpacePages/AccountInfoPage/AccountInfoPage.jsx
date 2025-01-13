import "../commonStyle.css"
import "./style.css"
import { ErrorModal, SuccessModal } from "../../../reusable-components/Modal/Modal";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useLoading } from "../../../contexts/LoadingContext";

import validator from "validator";

export default function AccountInfoPage(){
    const {showLoading, hideLoading} = useLoading();
    const navigate = useNavigate();
    const {userDetail, fetchUserDetail, signOut} = useAuth();
    const [Verify_isErrorModalOpen, setVerify_isErrorModalOpen] = useState(false); 
    
    const [Update_isErrorModalOpen, setUpdate_isErrorModalOpen] = useState(false); 
    const [Update_isSuccessModalOpen, setUpdate_isSuccessModalOpen] = useState(false);
    const [Update_Message, setUpdate_Message] = useState("");
    const [Validate_isErrorModalOpen, setValidate_isErrorModalOpen] = useState(false); 
    const [Validate_errorMsg, setValidate_errorMsg] = useState(""); 

    const [formData, setFormData] = useState({
        account: (userDetail && userDetail.account) || "",
        name: (userDetail && userDetail.name) || "",
        email: (userDetail && userDetail.email) || "",
        phone: (userDetail && userDetail.phone) || "",
        gender: (userDetail && userDetail.gender) || "",
        birthDate: (userDetail && userDetail.birthDate) || "",

        thumbnailURL: (userDetail && userDetail.thumbnailURL || ""),
        thumbnailFile: null,

    }) 
    //useEffect(()=>{console.log("Form data: " + JSON.stringify(formData)),[formData]})
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
        if (userDetail) {
            setFormData({
                account: (userDetail && userDetail.account) || null,
                name: (userDetail && userDetail.name) || null,
                email: (userDetail && userDetail.email) || null,
                phone: (userDetail && userDetail.phone) || null,
                gender: (userDetail && userDetail.gender) || null,
                birthDate: (userDetail && userDetail.birthDate) || null,
        
                thumbnailURL: (userDetail && userDetail.thumbnailURL || null),
                thumbnailFile: null,
            });
        }
          
          
    }, [userDetail]);

    const validateForm = () =>{
        if(formData.email &&  formData.email!=="" && !validator.isEmail(formData.email)){
            setValidate_errorMsg("Định dạng email không hợp lệ")
            setValidate_isErrorModalOpen(true);
            return false;
        }

        const phoneRegex = /^\d{10}$/;
        if (formData.phone && formData.phone!=="" && !phoneRegex.test(formData.phone)) {
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
        const data = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if(value){
                data.append(key, value);
            } 
        }
        try {
            showLoading();
            const response = await axios.patch('http://localhost:8000/api/user/info',data,
              {headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            fetchUserDetail();
            if(formData.email!=="" || formData.phone!==""){
                setUpdate_Message("Cập nhật thông tin người dùng thành công");
            }else{
                setUpdate_Message("Cập nhật thông tin người dùng thành công! Vui lòng kiểm tra lại email và số điện thoại");
            }
            setUpdate_isSuccessModalOpen(true);
          }catch (error) {
            console.log(error);
            if (error.response) {
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
            <div className="User-space-form AccountInfoPage">
                <div>
                    <h2>Hồ sơ của tôi</h2>
                    <h3 style={{marginTop:"-20px"}}>Quản lý thông tin hồ sơ để bảo mật tài khoản</h3>
                </div>
                <hr />
                <div className="content">
                    <div className="form">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            value={formData.account}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, account: e.target.value }))
                            }
                            className="TextInput"
                        />
                        <label>Tên</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            className="TextInput"
                        />
                        <label>Email</label>
                        <input
                            type="text"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, email: e.target.value }))
                            }
                            className="TextInput"
                        />
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, phone: e.target.value }))
                            } 
                            className="TextInput"
                        />
                        <label>Giới tính</label>
                        <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"20px"}}>
                            <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}>
                                <input className="RadioInput" type="radio" id="nam" name="gender" value="Nam"  
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, gender: e.target.value }))
                                } 
                                checked={formData.gender === "Nam"}
                                />
                                <label htmlFor="nam">Nam</label>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}>
                                <input className="RadioInput" type="radio" id="nu" name="gender" value="Nữ" 
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, gender: e.target.value }))
                                } 
                                checked={formData.gender === "Nữ"}
                                />
                                <label htmlFor="nu">Nữ</label>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}>
                                <input className="RadioInput" type="radio" id="khac" name="gender" value="Khác"
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, gender: e.target.value }))
                                } 
                                checked={formData.gender === "Khác"} 
                                />
                                <label htmlFor="khac">Khác</label>
                            </div>          
                        </div>
                        <label>Ngày sinh</label>
                        <input
                            type="date"
                            value={formData.birthDate ? formData.birthDate.split("T")[0] : ""}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, birthDate: e.target.value }))
                            }
                            className="TextInput"
                        />
                        <div/>
                        <button onClick={handleSubmit} style={{fontSize: "16px", width:"200px"}}className="standard-button-1">
                            Cập nhật thông tin
                        </button>
                    </div>
                    <div className="image">
                        <img
                            src={
                                formData.thumbnailFile ? URL.createObjectURL(formData.thumbnailFile) : 
                                    (formData.thumbnailURL ? formData.thumbnailURL: "https://res.cloudinary.com/ddrfocetn/image/upload/v1732590791/rkq5zo350eovgemvkjyb.jpg")
                            }
                        />
                        <input id="file-input" style={{width: "200px"}}
                            type="file"
                            accept="image/png, image/jpeg"
                            multiple={false}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setFormData((prev) => ({
                                    ...prev,
                                    thumbnailFile: file,
                                }));  
                            }}
                        />
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
                message={"Cập nhật thông tin người dùng thất bại. Vui lòng thử lại"} 
            />
            <SuccessModal 
                isOpen={Update_isSuccessModalOpen} 
                onClose={() => {
                    setUpdate_isSuccessModalOpen(false)
                }} 
                message={Update_Message} 
            />
        </>
        
    )
}