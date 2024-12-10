import './style.css'
export default function SizeChooseBox({ size, selected, handleOnClick}) {
  return (
    <button onClick={handleOnClick} className={`SizeChooseBox modal-product-normal-font ${selected ? "SizeChooseBox-selected" : ""}`}>
        {size.size_name}
    </button>
  );
}
