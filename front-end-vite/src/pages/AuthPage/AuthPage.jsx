import { useNavigate } from 'react-router-dom'
import './style.css'


export default function AuthPage(){
    const navigate = useNavigate()
    return (
    <div className='AuthPage'>
        <h1>This is an auth page</h1>
        <button onClick={()=> {navigate('/')}}>
            <h1>Click here to get to home page</h1>
        </button>
    </div>
    )
}