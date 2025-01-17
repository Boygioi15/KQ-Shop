import {useState,useEffect} from "react";
import { NavLink } from "react-router";
import { MdClose } from "react-icons/md";

import axios from "axios";
import './style.css'
import RatingAndReview from "../RatingAndReview/RatingAndReview";
import SizeChooseBox from "../SizeChooseBox/SizeChooseBox";
import SmallPictureCard from "../SmallPictureCard/SmallPictureCard";
import { useLoading } from "../../contexts/LoadingContext";
import { useCart } from "../../contexts/CartContext";
import { ErrorModal } from "../Modal/Modal";
export default function ProductModal({productID,handleOnClose}){
    //console.log(productID)

    const {addItemToCart} = useCart();
    const [productDetail,setProductDetail] = useState(null);
    const [selectedColor,setSelectedColor] = useState(null);
    const [selectedSize,setSelectedSize] = useState(null);
    const [selectedImageURL, setSelectedImageURL] = useState(null);

    const {showLoading, hideLoading} = useLoading();

    const [AddItemToCart_IsErrorModalOpen,setAddItemToCart_IsErrorModalOpen ] = useState(false);
    const [AddItemToCart_ErrorMsg, setAddItemToCart_ErrorMsg] = useState("");
    useEffect(() => {
        // Function to fetch events from the backend
        //console.log(productID)
        const fetchProductDetail = async () => {
          try {
            showLoading();
            const response = await axios.get(`http://localhost:8000/api/product/modal/${productID}`);
            setProductDetail(response.data); // Assigning the fetched list of events to the state
            
          } catch (error) {
            console.error('Error fetching events:', error);
          }
          finally{
            hideLoading();
          }
        };
        fetchProductDetail();
      }, []
    ); 
    useEffect(()=>{
        if(productDetail){
            setSelectedColor(productDetail.types[0]);
        }
        
    },[productDetail])
    useEffect(()=>{
        if(selectedColor){
            setSelectedSize(selectedColor.details[0]);
            setSelectedImageURL(selectedColor.color_ImageURL[0])
            //console.log(selectedColor.color_ImageURL)
        }
    },[selectedColor])

    const handleAddItemToCart = async () =>{
        const productID = productDetail.id;
        const product_typeID = selectedColor._id;
        const product_type_detailID = selectedSize._id;
        const productIdentifier = {productID,product_typeID, product_type_detailID};
        const quantity = 1;
        console.log(productDetail);
        try{
            await addItemToCart(productIdentifier,quantity)
        }
        catch(error){
            setAddItemToCart_ErrorMsg("Trong kho không có đủ hàng!");
            setAddItemToCart_IsErrorModalOpen(true);
        }
        
    }
    if(!productDetail||!selectedColor || !selectedSize ||!selectedImageURL){
        return;
    }
    return(
        <div className="wrapper">
            <div className="ProductModal">
                <div onClick={handleOnClose}className="closeButton"><MdClose/></div>
                <div className="colorDisplay">
                {selectedColor.color_ImageURL.map((url,index) => (
                    <SmallPictureCard key={index} imageURL={url} selected={url===selectedImageURL} handleOnClick={()=>setSelectedImageURL(url)} />
                ))}
                </div>
                <div className="imageDisplay">
                    <img src={selectedImageURL}/>
                </div>
                <div className="description">
                    <div className="brief-product-shop-font">{productDetail.shopName}</div>
                    <div className="modal-product-name-font">{productDetail.name}</div> 
                    <div><RatingAndReview ratings={productDetail.ratingsCount} reviews={productDetail.reviewsCount}/></div>
                    <div className="price modal-product-price-font">{(+selectedSize.price).toLocaleString('vi-VN')+'đ'}</div>
                    <div className="colorSelection">
                        <div className="text">
                            <div className="modal-product-name-font">{`Màu sắc:`}</div>
                            <div className="modal-product-normal-font">{selectedColor.color_name}</div>
                        </div>
                        <div className="arrayOfImage">
                        {productDetail.types.map((type) => (
                            <SmallPictureCard key={type._id} imageURL={type.color_ImageURL[0]} compareInfo1={type} selected={type ===selectedColor} handleOnClick={()=>setSelectedColor(type)} />
                        ))}
                        </div>
                    </div>
                    <div className="sizeSelection">
                        <div className="text">
                                <div className="modal-product-name-font">{`Kích thước:`}</div>
                                <div className="modal-product-normal-font">{selectedSize.size_name}</div>
                        </div>
                        <div className="arrayOfSize">
                        {selectedColor.details.map((detail) => (
                            <SizeChooseBox key={detail._id} size={detail} selected={detail===selectedSize} handleOnClick={()=>setSelectedSize(detail)}/>
                        ))}
                        </div>
                    </div>
                    <div className="addToCartAndFavorite">
                        <button onClick={handleAddItemToCart} className="standard-button-1">THÊM VÀO GIỎ HÀNG</button>
                    </div>
                    <NavLink className="nav-link" to={`/product-detail/${productID}`} >Xem sản phẩm chi tiết</NavLink>
                </div>
            </div>

            <ErrorModal 
                isOpen={AddItemToCart_IsErrorModalOpen} 
                onClose={()=>setAddItemToCart_IsErrorModalOpen(false)}
                message={AddItemToCart_ErrorMsg}
            />
        </div>
        
    )
        

}
/*
export default function ProductModal({productID}){
    useEffect(()=>{
        console.log("HI")
        console.log("HO")
        const fetchProductDetail = async () => {
            try {
              const response = await axios.get(`http://localhost:8000/api/product/${productID}`);
              console.log(response)
            } catch (error) {
              console.error('Error fetching events:', error);
            }
        }
        fetchProductDetail();
    },[])
    return <div><h1>Hello</h1></div>
}
    */