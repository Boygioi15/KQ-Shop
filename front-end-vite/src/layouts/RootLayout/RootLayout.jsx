import  TopNav  from "./TopNav";
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import './style.css'
import { CartProvider,useCart } from "../../contexts/CartContext";
import LoadingScreen from "../../reusable-components/LoadingScreen/LoadingScreen";
import { useAuth } from "../../contexts/AuthContext";
import ChatBotWidget from "../../components/ChatBotWidget";

export default function RootLayout({children}){
    
    return(
        <div className="RootLayout">
        <TopNav />
        <LoadingScreen />
        <ChatBotWidget />
        {children ?? <Outlet />}
        </div>
    );
}
