// src/component/Product/SortButton.js

import React from "react";
import { AiOutlineSortAscending, AiOutlineRight } from "react-icons/ai";
import { SortOptions } from "./sortOption"; // Import constants

const SortButton = ({ isSortDropdownOpen, toggleSortDropdown, handleSortOptionSelect }) => {
  const handleOptionSelect = (option) => {
    handleSortOptionSelect(option); // Gọi hàm sort khi chọn một option
    toggleSortDropdown(); // Đóng dropdown sau khi chọn
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSortDropdown}
        type="button"
        className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
      >
        <AiOutlineSortAscending className="-ms-0.5 me-2 h-4 w-4" />
        Sắp xếp theo
        <AiOutlineRight className="-me-0.5 ms-2 h-4 w-4" />
      </button>
      {isSortDropdownOpen && (
        <div
          id="sortDropdown"
          className="absolute right-0 z-50 mt-2 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow-lg p-4"
        >
          <div className="flex flex-col space-y-1">
            {/* Các tùy chọn sắp xếp */}
            {Object.values(SortOptions).map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)} // Gọi hàm handleOptionSelect khi chọn
                className="text-left w-full hover:bg-gray-100 px-2 py-1"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;
