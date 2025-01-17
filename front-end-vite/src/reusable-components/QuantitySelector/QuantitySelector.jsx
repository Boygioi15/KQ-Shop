import { FaMinus, FaPlus } from "react-icons/fa";
import './style.css'
import { IoIosArrowUp, IoIosArrowDown, IoIosCheckmark } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

export default function QuantitySelector({amount, onAmountChange, limit}){
    const [localAmount, setLocalAmount] = useState("")
    const [dropdownOpen, setDropDownOpen] = useState(false);
    const inputRef = useRef(null);
    useEffect(()=>{
      setLocalAmount(amount);
    },[amount])
    const handleAmountChange = (e) => {
      const input = e.target.value;
    
      if (isNaN(input) && input !== "") {
        return;
      }
      const newLimit = limit>99? 99:limit;
      const sanitizedValue = input > newLimit ? newLimit : input;
      setLocalAmount(sanitizedValue);
    };
    
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && localAmount !== "") {
        if(+localAmount!==amount){
          console.log(localAmount, amount)
          onAmountChange(+localAmount)
        }    
        if(inputRef.current){
          inputRef.current.blur();
        }
      }
    };
    const handleOnBlur = ()=>{
      if(localAmount!==""){
        if(+localAmount!==amount){
          onAmountChange(+localAmount)
        }    
      }
      setDropDownOpen(false)
    }
    useEffect(()=>{console.log(dropdownOpen)},[dropdownOpen])
    const handleFocusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus(); // Focus the input field
      }
    };
    
    return (
      <div onBlur={handleOnBlur} style={{position:"relative"}}className="QuantitySelector">
        <label>SL: </label>
        <input
          type="text"
          ref={inputRef}
          value={localAmount}
          onChange={handleAmountChange}
          onKeyDown={handleKeyPress}
          onBlur={handleOnBlur}
        />
        <button onClick={()=>setDropDownOpen(!dropdownOpen)}className="sc_dropdown">
          {dropdownOpen? <IoIosArrowUp/> : <IoIosArrowDown/>}
          <div className={`QuantitySelector_Dropdown ${dropdownOpen?"QuantitySelector_DropDown_Active":"QuantitySelector_DropDown_Inactive"}`}>
            {(()=>{
              const dropDownList = []
              let actualLimit = (limit<=10)? limit : 10;
              for(let i = 1;i<=actualLimit;i++){
                dropDownList.push(
                  <NumberRow amount={i} onSelected={()=>onAmountChange(i)} selected={localAmount===i}/>
                )
              }
              if(limit>10){
                dropDownList.push(
                  <NumberRow amount={"10+"} onSelected={handleFocusInput} selected={localAmount>10}/>
                )
              }
              return dropDownList
            })()}
          </div>   
        </button>
      </div>
    );
  }
  function NumberRow({amount, onSelected, selected}){
    return (
      <div onClick={onSelected} className={`NumberRow brief-product-name-font ${selected? "NumberRowSelected" :"NumberRowNormal"}`} >
          <label>{amount}</label>
          <IoIosCheckmark style={{visibility:selected?"visible" : "hidden"}}/>
      </div>
    )
  }