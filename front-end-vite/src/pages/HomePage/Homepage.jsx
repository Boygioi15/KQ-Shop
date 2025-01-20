import { redirect, useNavigate } from "react-router-dom";
import { CategoryLists } from "./CategoryLists";
import { ProductDisplay } from "./ProductDisplay";
import { useAuth } from '../../contexts/AuthContext';
import './style.css'

export default function HomePage(){
    const navigate = useNavigate()
    const { token } = useAuth();

    return <div className = "HomePage">
        <ProductDisplay />
        <button 
        onClick={()=> {navigate('/auth')}}>
            {//<h1>Click here to get to auth page</h1>
            }
        </button>
        {
            // <div>
            //     {token ? (
            //         <div>
            //         <h1>Welcome, {token}</h1>
            //         {/* Display user-specific content */}
            //         </div>
            //     ) : (
            //         <div>
            //         <h1>Welcome to our website</h1>
            //         {/* Display general content */}
            //         </div>
            //     )}
            // </div>
        }
        
    </div>
}