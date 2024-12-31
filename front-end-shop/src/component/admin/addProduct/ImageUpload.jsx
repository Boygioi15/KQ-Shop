import React from "react";
import { ImBin } from "react-icons/im";

const ImageUpload = ({ skuIndexId, skuImgs, onImageUpload, onRemoveImage }) => {
  return (
    <div>
      {skuImgs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skuImgs.map((image, imgIndex) => (
            <div key={imgIndex} className="relative">
              <img
                src={image}
                alt={`Image ${imgIndex + 1}`}
                className="w-20 h-20 object-cover border rounded"
              />
              <button
                onClick={() => onRemoveImage(skuIndexId, imgIndex)}
                className="absolute top-0 right-0 text-red-500"
              >
                <ImBin />
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        multiple
        onChange={(e) => onImageUpload(skuIndexId, e)}
        className="w-full mt-2"
      />
    </div>
  );
};

export default ImageUpload;
