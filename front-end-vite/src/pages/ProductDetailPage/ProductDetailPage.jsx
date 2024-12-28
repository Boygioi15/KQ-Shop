import { useParams, NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import "./style.css"

import SmallPictureCard from "../../reusable-components/SmallPictureCard/SmallPictureCard";
import RatingAndReview from "../../reusable-components/RatingAndReview/RatingAndReview";
import SizeChooseBox from "../../reusable-components/SizeChooseBox/SizeChooseBox";
import QuantitySelector from "../../reusable-components/QuantitySelector/QuantitySelector";
import { useLoading } from "../../contexts/LoadingContext";
export default function ProductDetailPage(){
    const {id} = useParams();
    const [productDetail,setProductDetail] = useState(null);
    const [selectedColor,setSelectedColor] = useState(null);
    const [selectedSize,setSelectedSize] = useState(null);
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    
    const {showLoading, hideLoading} = useLoading();
    useEffect(() => {
        // Function to fetch events from the backend
        //console.log(productID)
        const fetchProductDetail = async () => {
          try {
            showLoading();
            const response = await axios.get(`http://localhost:8000/api/product/modal/${id}`);
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

    if(!productDetail||!selectedColor || !selectedSize ||!selectedImageURL){
        return;
    }

    return (
        <div className="ProductDetailPage">
            <div style={{justifyContent: "center", display:"flex"}}className="ProductModal Form">
            <div className="colorDisplay">
            {selectedColor.color_ImageURL.map((url,index) => (
                <SmallPictureCard key={index} imageURL={url} selected={url===selectedImageURL} handleOnClick={()=>setSelectedImageURL(url)} />
            ))}
            </div>
                <div style={{width:"400px"}} className="imageDisplay">
                    <img style={{width:"100%"}}src={selectedImageURL}/>
                </div>
                <div style={{marginLeft:"20px", width: "400px"}}className="description">
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
                            <SmallPictureCard imageURL={type.color_ImageURL[0]} compareInfo1={type} selected={type ===selectedColor} handleOnClick={()=>setSelectedColor(type)} />
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
                            <SizeChooseBox size={detail} selected={detail===selectedSize} handleOnClick={()=>setSelectedSize(detail)}/>
                        ))}
                        </div>
                        <div style={{display: "flex", flexDirection:"column", gap: "5px"}}>
                            <div className="modal-product-name-font">{`Số lượng:`}</div>
                            <QuantitySelector quantity={1} onIncrement={()=>{}} onDecrement={()=>{}}/>
                        </div>
                        <div style={{marginTop: "10px"}}className="addToCartAndFavorite">
                            <button className="standard-button-1">THÊM VÀO GIỎ HÀNG</button>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div style={{textAlign:"center", marginTop:"20px"}}>
                <h1>Thông tin SHOP</h1>
            </div>
            <div style={{textAlign:"center", marginTop:"20px"}}>
                <h1>Chi tiết sản phẩm</h1>
            </div>
            <div style={{textAlign:"center", marginTop:"20px"}}>
                <h1>Mô tả sản phẩm</h1>
            </div>
        </div>
    );
}