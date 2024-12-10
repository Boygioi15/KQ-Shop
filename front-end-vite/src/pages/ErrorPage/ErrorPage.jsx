import errorPageImage from '../../assets/images/errorPageImage.png'
import RootLayout from '../../layouts/RootLayout/RootLayout'
import { useNavigate, useRouteError } from 'react-router-dom';
import './style.css'
export default function ErrorPage(){
    const error = useRouteError();
    const navigate = useNavigate()
    console.error(error);
    return (
        <div className="ErrorPage event-banner-font">
            <img src={errorPageImage}></img>
            <p>OOPs... Chúng mình không tìm thấy trang web bạn yêu cầu. Mình trở lại nhé...</p>
            <button onClick = {()=>navigate('/')}className="standard-button-1">Quay lại trang chủ</button>
        </div>
    )
}