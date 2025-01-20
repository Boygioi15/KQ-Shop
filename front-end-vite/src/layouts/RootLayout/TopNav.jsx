import {IsNotEmpty, IsString} from 'class-validator'
import { useState, useEffect } from 'react';
import { IoIosArrowBack,IoIosArrowForward, IoIosHelpCircleOutline    } from "react-icons/io";
import { FaRegUser,FaRegHeart, FaShoppingCart, FaSearch    } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

import axios from 'axios'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CartPage from '../../pages/CartPage/CartPage';
export default function TopNav(){
    
    return (
        <div>
            <EventBanner />
            <Shortcut />
        </div>
    )
}

function EventBanner(){
    const [events, setEvents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const showPreviousEvent = () => {
        if(currentIndex==0){
            setCurrentIndex(events.length-1);
        }else{
            setCurrentIndex(currentIndex-1);
        }
    }
    const showNextEvent = () => {
        if(currentIndex==events.length-1){
            setCurrentIndex(0);
        }else{
            setCurrentIndex(currentIndex+1);
        }
    }
    useEffect(() => {
        // Function to fetch events from the backend
        const fetchEvents = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/event');
            setEvents(response.data); // Assigning the fetched list of events to the state
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        };
    
        fetchEvents();
      }, []); 


      useEffect(() => {
        if (events.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [events]);
      //console.log(events.length)
      return (
        <>
            {events.length > 0 ? (
                <div className="TopNav_EventBanner"> 
                    <IoIosArrowBack onClick = {showPreviousEvent} className='big-icon interactive-icon on-hover1'/>

                    <div className="TopNav_EventBanner">
                        <p className="EventBanner_Description event-banner-font">{events[currentIndex].description}</p>
                        <button className="EventBanner_Button">
                        Xem ngay
                        </button>
                    </div>
                    <IoIosArrowForward onClick = {showNextEvent} className='big-icon interactive-icon on-hover1'/>
                </div>
            )
            :
            (
                <div className="TopNav_EventBanner">
                    <p className="EventBanner_Description1  event-banner-font">Hiện tại đang không có chương trình sự kiện nào</p>
                </div> 
            )}
        </>
      )
}
function Shortcut(){
    const navigate = useNavigate();
    const {signInNotification, signOut} = useAuth();
    useEffect(()=>{console.log("HI")},[signInNotification])
    const token = localStorage.getItem('token')
    return(
        <div className = "TopNav_Shortcut">
            <span onClick={()=>navigate('/')} className='Shortcut_Homepage'>KQ-Shop</span>
            <QuickSearchBar />
            <div className="Shortcut_right">
                <div className='sc_dropdown'>
                    <IconShortcut 
                    initIcon={<FaShoppingCart  className='ShortcutIcon'/>}
                    />
                    <CartPage className="Cart_Dropdown"/>
                </div>
                
                
                <div className="sc_dropdown" style={{position:"relative"}}>
                    <IconShortcut 
                            initIcon={<FaRegUser style={{color: token&& "black"}}className='ShortcutIcon' />}
                            action={()=>{
                                if(!token){
                                    navigate("/auth/sign-up")
                                }
                                else{
                                    navigate("/user-space")
                                }
                            }
                        }
                    />
                    {token && <div className="Login_Dropdown">
                        <label onClick={()=>{
                            navigate('/user-space/account')
                        }
                        } 
                        className="abc_label">Tài khoản</label>
                        <label onClick={()=>{
                            signOut() 
                            navigate('/auth')
                        }
                        } 
                        className="abc_label">Đăng xuất</label>
                    </div>}
                </div>               

            </div>
            
        </div>
    )
}
function QuickSearchBar(){
    const [text,setText] = useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
        if (!text.trim()) {
            console.log("Search text is empty!");
            return;
        }
        console.log("Navigating to:", `/products/${text}`);
        navigate(`/products/${text}`);
    };
    return(
        <div className='Shortcut_QuickSearchBar '>
            <div className='Shortcut_Text'>
            <input
                className="search-font"
                type="text"
                value={text} // Use `value` instead of `text`
                onChange={(e) => setText(e.target.value)} // Extract the value and pass it to `setText`
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                  }}
            />
                <MdCancel className='innerCancel'/>
            </div>
            <div onClick={handleSearch} className='Shortcut_Search'>
                <CiSearch className='ShortcutIcon' />
            </div>
        </div>
    )
}
function IconShortcut({initIcon, number, action}){
    return (
        <div onClick={action} className='Shortcut_Icon hover-background'>
            {initIcon}
            {(number && number >0) && (
                <div>
                    {number}
                </div>
            )}
        </div>
    )
}
