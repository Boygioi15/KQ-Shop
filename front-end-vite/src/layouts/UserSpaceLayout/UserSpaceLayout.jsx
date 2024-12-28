import { FaRegUser,FaPlus, FaMinus  } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css"
export default function UserSpaceLayout(){
    const navigate = useNavigate();
    const [currentSelectedTab, setCurrentSelectedTab] = useState(0);
    
    const [accountOpen, setAccountOpen] = useState(true);
    useEffect(()=>{navigate("/user-space/account")},[])
    return(
        <div className="USL-wrapper">
            <div className="User-space-layout">
                <div className="tabs">
                    <div>
                        <div className="modal-product-name-font">Thông tin người dùng</div>
                        <hr />
                    </div>
                
                    <UserSpaceTabParent name="Tài khoản của tôi" icon={<FaRegUser/>} open={accountOpen} onOpen={()=>setAccountOpen(!accountOpen)}>
                        <UserSpaceTabChild_Lv2 name="Hồ sơ" linkTo="/user-space/account" active={currentSelectedTab === 0} onClick={()=>setCurrentSelectedTab(0)}/>
                        <UserSpaceTabChild_Lv2 name="Đổi mật khẩu" linkTo="/user-space/password" active={currentSelectedTab === 1 } onClick={()=>setCurrentSelectedTab(1)}/>
                        <UserSpaceTabChild_Lv2 name="Địa chỉ" linkTo="/user-space/address" active={currentSelectedTab === 2} onClick={()=>setCurrentSelectedTab(2)}/>
                    </UserSpaceTabParent>
                    <UserSpaceTabChild_Lv1 name="Đơn mua" linkTo="/user-space/transactions" active={currentSelectedTab === 3} onClick={()=>setCurrentSelectedTab(3)}/>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
function UserSpaceTabChild_Lv2({name, linkTo, icon, active, onClick}){
    return(
        <Link className= {`TabLeaf ` + (active ? `User-tab-selected`:`User-tab-not-selected`) }to={linkTo}
            onClick={(e) => {
                e.stopPropagation(); // Prevent event from propagating to parent
                onClick()
            }}
        >
            {icon}
            {name}
        </Link>
    )
}
function UserSpaceTabChild_Lv1({name, linkTo, icon, active, onClick}){
    return(
        <div className={`TabParent brief-product-name-font ` + (active ? `User-tab-selected`:`User-tab-not-selected`)} onClick={onClick}>
            <div className="row">
                {icon}
                {name}
            </div>
        </div>
    )
}
function UserSpaceTabParent({name, icon, children, open, onOpen}){
    return(
        <div className={`TabParent brief-product-name-font ` + (open ? `User-tab-selected`:`User-tab-not-selected`)} onClick={onOpen}>
            <div className="row">
                {icon}
                {name}
                <div style={{position:"absolute", right:"0px"}}>
                {open? (
                    <FaMinus />
                ):
                (
                    <FaPlus />
                )
                }
            </div>
            </div>
            {open && children && (
                <div className="children">
                    {children}
                </div>
            )}  
        </div>
    )
}