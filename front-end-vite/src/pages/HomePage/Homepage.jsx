import { redirect, useNavigate } from "react-router-dom";
import { CategoryLists } from "./CategoryLists";
import { ProductDisplay } from "./ProductDisplay";
import './style.css'

export default function HomePage(){
    const navigate = useNavigate()
    return <div className = "HomePage">
        <CategoryLists />
        <ProductDisplay />
        <button 
        onClick={()=> {navigate('/auth')}}>
            <h1>Click here to get to auth page</h1>
        </button>
    </div>
}