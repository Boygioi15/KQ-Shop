import { FaRegUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css"
export default function UserSpaceLayout(){
    const navigate = useNavigate();
    const [currentSelectedTab, setCurrentSelectedTab] = useState(0);
    return(
        <div className="User-space-layout">
            <div className="tabs">
                <UserSpaceTabParent name="Tài khoản của tôi" icon={FaRegUser} 
                    active={currentSelectedTab < 3}
                    onClick={
                        () => {
                            setCurrentSelectedTab(0)
                            navigate("/user-space/account")
                        }
                    }
                >
                    <UserSpaceTabLeaf name="Hồ sơ" linkTo="/user-space/account" active={currentSelectedTab === 0} />
                    <UserSpaceTabLeaf name="Đổi mật khẩu" linkTo="/user-space/change-password" active={currentSelectedTab === 1} />
                    <UserSpaceTabLeaf name="Địa chỉ" linkTo="/user-space/address" active={currentSelectedTab === 2} />
                </UserSpaceTabParent>
                <UserSpaceTabLeaf name="Đơn mua" linkTo="/user-space/transactions"/>
            </div>
            <Outlet />
        </div>
    )
}
function UserSpaceTabLeaf({name, linkTo, icon, active}){
    return(
        <Link className= {`TabLeaf ` + (active && `User-tab-selected`) }to={linkTo}>
            {icon}
            {name}
        </Link>
    )
}
function UserSpaceTabParent({name, icon, onClick, active, children}){
    return(
        <div className="TabParent" onClick={onClick}>
            <div>
                {icon}
                {name}
            </div>
            {children && (
                <div className="children">
                    {children}
                </div>
            )}
        </div>
    )
}