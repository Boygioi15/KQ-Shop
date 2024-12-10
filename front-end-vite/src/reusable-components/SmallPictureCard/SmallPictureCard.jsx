import './style.css'
export default function SmallPictureCard({ imageURL, compareInfo1, selected, handleOnClick}) {
  //console.log(imageURL)
  return (
    <div onClick={handleOnClick} className={`SmallPictureCard ${selected ? "SmallPictureCard-selected" : ""}`}>
      <img src={imageURL} alt="Product" />
    </div>
  );
}
