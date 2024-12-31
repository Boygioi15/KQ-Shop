import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Biểu tượng mũi tên dropdown

const FilterDropMenu = ({ label, options, value, onChange, onApply }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mở và đóng menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Chọn giá trị từ dropdown
  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    onApply({
      [label.toLowerCase()]: selectedValue,
    });
    setIsOpen(false); // Đóng dropdown sau khi chọn
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full py-2 px-4 bg-white rounded-md text-sm font-medium text-gray-700"
        onClick={toggleDropdown}
      >
        <span className="mr-2">{value}</span> {/* Thêm khoảng cách cho giá trị */}
        <FaChevronDown className="ml-4" /> {/* Tăng khoảng cách giữa biểu tượng và văn bản */}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1 text-sm text-gray-700">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropMenu;
