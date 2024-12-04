import { TopNav } from "./TopNav";
import { Outlet } from "react-router-dom";
import './style.css'
export default function RootLayout(){
    return <div className = "RootLayout">
        <TopNav/>
        <Outlet/>
    </div>
}
