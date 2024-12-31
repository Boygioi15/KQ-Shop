import { FaCheck } from "react-icons/fa6";

const OptionsCard = ({ options, selectedOption, onSelectOption }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {options.map((option, index) => (
        <a
          key={index}
          className={`flex justify-center items-center relative px-2 py-1 border rounded-lg cursor-pointer ${
            selectedOption.label === option.label
              ? "border-mainColor"
              : "border-gray-300"
          }`}
          onClick={() => onSelectOption(option)}
        >
          {option.src && (
            <img
              src={option.src}
              alt={option.label || "Option Image"}
              className="w-8 h-8"
            />
          )}
          <span
            className=" font-semibold text-gray-800 p-2
              lg:text-text-base md:text-sm text-xs" // Thêm các lớp thay đổi cỡ chữ
          >
            {option.label}
          </span>
          {selectedOption.label === option.label && (
            <span
              className="absolute top-0 right-0 w-7 h-7 bg-mainColor flex items-center justify-center rounded-tr-lg"
              style={{
                clipPath: "polygon(100% 0, 0% 0, 100% 100%)",
                transform: "translate(1px, -1px)",
              }}
            >
              <FaCheck
                className="text-white text-xs"
                style={{ transform: "translate(5px, -5px)" }}
              />
            </span>
          )}
        </a>
      ))}
    </div>
  );
};
const ok = () => {
  return (
    <>
      <a
        key={optionIndex}
        className={`flex justify-center items-center relative px-2 py-1 border rounded-lg cursor-pointer ${
          selectedVariants[variationIndex] === optionIndex
            ? "border-mainColor"
            : "border-gray-300"
        }`}
        onClick={() => handleVariantChange(variationIndex, optionIndex)}
      >
        {variation.images.length > 0 && (
          <img src={variation.images[optionIndex]} className="w-8 h-8" />
        )}
        <span className="text-base font-semibold text-gray-800 p-2">
          {option[optionIndex]}
        </span>
        {selectedVariants[variationIndex] === optionIndex && (
          <span
            className="absolute top-0 right-0 w-7 h-7 bg-mainColor flex items-center justify-center rounded-tr-lg"
            style={{
              clipPath: "polygon(100% 0, 0% 0, 100% 100%)",
              transform: "translate(1px, -1px)",
            }}
          >
            <FaCheck
              className="text-white text-xs"
              style={{ transform: "translate(5px, -5px)" }}
            />
          </span>
        )}
      </a>
    </>
  );
};
export default OptionsCard;
