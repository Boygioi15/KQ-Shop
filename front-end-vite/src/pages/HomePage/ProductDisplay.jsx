import { useState, useEffect } from "react";
import BriefProductCard from "../../reusable-components/BriefProductCard/BriefProductCard"
import axios from "axios"
import { useLoading } from "../../contexts/LoadingContext";
export function ProductDisplay(){
    const [briefProductList, setBriefProductList] = useState([]);
    const {showLoading, hideLoading} = useLoading();
    useEffect(() => {
        // Function to fetch events from the backend
        const fetchBriefProductList = async () => {
          try {
            showLoading();
            const response = await axios.get('http://localhost:8000/api/product/brief');
            setBriefProductList(response.data); // Assigning the fetched list of events to the state
          } catch (error) {
            console.error('Error fetching events:', error);
          }
          finally{
            hideLoading();
          }
        };
    
        fetchBriefProductList();
      }, []); 

      return (
        <div className="HomePage_ProductDisplay"> 
          {briefProductList.length > 0 ? (
            briefProductList.map(({ id, name, price, shop, initImgURL, hoverImgURL }) => (
              <BriefProductCard 
                key={id} 
                id={id} 
                name={name} 
                shop={shop}
                price={price} 
                initImgURL={initImgURL} 
                hoverImgURL={hoverImgURL} 
              />
            ))
          ) : (
            <h1>There is no product to display</h1>
          )}
        </div>
      );
    }      