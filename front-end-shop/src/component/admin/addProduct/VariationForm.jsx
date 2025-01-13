import React from "react";
import { IoRemoveOutline } from "react-icons/io5";
import OptionForm from "./OptionForm";

const VariationForm = ({ variation, index, onChange, onRemove, onOptionChange, onAddOption, onRemoveOption }) => {
  return (
    <div className="relative mb-4 p-4 w-full border rounded bg-[#f1f6ff] border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Phân loại {index + 1}</h3>
      </div>

      <div className="flex flex-col md:flex-row mb-2">
        <label className="font-medium w-1/3">Tên phân loại:</label>
        <label className="w-full p-2 border rounded">
          {variation.name}
        </label>
      </div>

      <OptionForm
        variation={variation}
        variationIndex={index}
        onOptionChange={onOptionChange}
        onAddOption={onAddOption}
        onRemoveOption={onRemoveOption}
      />
    </div>
  );
};

export default VariationForm;
