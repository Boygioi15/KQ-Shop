import React from "react";
import { ImBin } from "react-icons/im";

const OptionForm = ({ variation, variationIndex, onOptionChange, onAddOption, onRemoveOption }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <label className="font-medium w-1/3">Tùy chọn:</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-2 w-full">
        {variation.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center gap-x-4">
            <input
              type="text"
              value={option}
              onChange={(e) => onOptionChange(variationIndex, optionIndex, e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
            <button
              onClick={() => onRemoveOption(variationIndex, optionIndex)}
              className="text-red-500"
            >
              <ImBin />
            </button>
          </div>
        ))}

        <button
          onClick={() => onAddOption(variationIndex)}
          className="mt-2 px-4 py-1 text-sm text-mainColor border border-dashed rounded hover:bg-[#f1f6ff]"
        >
          Thêm tùy chọn
        </button>
      </div>
    </div>
  );
};

export default OptionForm;
