import React, { useState } from "react";
import FilterDropMenu from "./FilterDropMenu";
import IconFilter from "../../../assets/IconFilter.png";
import IconReset from "../../../assets/IconReset.png";
import CalendarFilter from "./CalendarFilter";

const OrderFilter = ({
  uniqueDates,
  uniqueTypes,
  uniqueStatuses,
  applyFilters,
}) => {
  const [filterDate, setFilterDate] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleReset = () => {
    setFilterDate("All");
    setFilterType("All");
    setFilterStatus("All");
    applyFilters({ date: "All", type: "All", status: "All" });
  };

  return (
    <div className="flex items-center justify-start mb-4 bg-white w-fit   h-[70px] rounded-[10px] px-2 space-x-4">
      {/* Icon Filter */}
      <div className="flex items-center justify-center border-r border-gray-300 px-6 h-full">
        <img src={IconFilter} alt="Filter Icon" className="w-5 h-5" />
      </div>

      {/* Filter Label */}
      <div className="flex items-center justify-center px-6 py-3 text-black text-sm tracking-wider font-semibold border-r border-gray-300 h-full">
        <h2 className="text-lg font-bold">Filter By</h2>
      </div>

      {/* Date Filter */}
      <div className="flex items-center justify-center px-6 py-3 text-black text-sm tracking-wider font-semibold border-r border-gray-300 h-full">
        <CalendarFilter />
      </div>

      {/* Order Type Filter */}
      <div className="flex items-center justify-center px-6 py-3 text-black text-sm tracking-wider font-semibold border-r border-gray-300 h-full">
        <FilterDropMenu
          label="Customer Type"
          options={[...uniqueTypes, "All"]}
          value={filterType}
          onChange={setFilterType}
          onApply={applyFilters}
        />
      </div>

      {/* Order Status Filter */}
      <div className="flex items-center justify-center px-6 py-3 text-black text-sm tracking-wider font-semibold border-r border-gray-300 h-full">
        <FilterDropMenu
          label="Order Status"
          options={[...uniqueStatuses, "All"]}
          value={filterStatus}
          onChange={setFilterStatus}
          onApply={applyFilters}
        />
      </div>

      {/* Reset Filter Button */}
      <div className="flex items-center justify-center px-6 py-3 text-black text-sm tracking-wider font-semibold h-full">
        <button
          className="flex items-center justify-center space-x-2 text-red-500 py-2 px-4 rounded-md"
          onClick={handleReset}
        >
          <img src={IconReset} alt="Reset Icon" className="w-5 h-5" />
          <span>Reset Filter</span>
        </button>
      </div>
    </div>
  );
};

export default OrderFilter;