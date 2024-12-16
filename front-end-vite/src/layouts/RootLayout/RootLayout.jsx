import  TopNav  from "./TopNav";
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import './style.css'
import { CartProvider,useCart } from "../../contexts/CartContext";

export default function RootLayout({children}){
    return(
        <div className="RootLayout">
        <TopNav />
        {children ?? <Outlet />}
        </div>
    );
}
