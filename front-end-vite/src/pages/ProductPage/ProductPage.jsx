import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import BriefProductCard from "../../reusable-components/BriefProductCard/BriefProductCard";
export default function ProductPage(){
    const {search} = useParams();
    const [briefProductList, setBriefProductList] = useState([]);
    useEffect(() => {
        // Function to fetch events from the backend
        const fetchBriefProductList = async () => {
          try {
            console.log(search);
            const response = await axios.get(`http://localhost:8000/api/product/brief/search/${search}`);
            setBriefProductList(response.data); // Assigning the fetched list of events to the state
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        };
    
        fetchBriefProductList();
      }, [search]); 

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