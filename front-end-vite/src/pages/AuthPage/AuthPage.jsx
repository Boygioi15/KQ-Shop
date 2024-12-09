import { useState } from "react"
import { Outlet, Link } from 'react-router-dom'; // Import Outlet
import './style.css'


export default function AuthPage(){
    const [showOTPModal, setShowOTPModal] = useState(false);

  return (
    <div className={`AuthPage ${showOTPModal ? 'backdrop-blur-sm' : ''}`}>
      <Outlet />
    </div>
  );
}