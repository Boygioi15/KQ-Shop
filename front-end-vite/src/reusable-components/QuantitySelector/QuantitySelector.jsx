import { FaMinus, FaPlus } from "react-icons/fa";
import './style.css'
export default function QuantitySelector({quantity, onIncrement, onDecrement}){
    return (
      <div className="QuantitySelector">
        <FaMinus className="button" onClick={onDecrement}/>
        <span>{quantity}</span>
        <FaPlus className="button" onClick={onIncrement}/>
      </div>
    );
  }