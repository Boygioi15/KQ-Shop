import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Mặc định styles
import { FaCalendarAlt } from "react-icons/fa";

const CalendarFilter = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const calendarRef = useRef();

  useEffect(() => {
    // Đóng calendar khi click ra ngoài
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={calendarRef}>
      {/* Nút chọn ngày */}
      <button
        className="flex items-center px-4 py-2 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out focus:bg-gray-100"
        onClick={toggleCalendar}
      >
        <FaCalendarAlt className="mr-2 text-gray-500" />
        {startDate && endDate
          ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
          : "Date"}
      </button>

      {/* Calendar */}
      {isOpen && (
        <div className="absolute mt-2 z-10 bg-white border border-gray-300 rounded-lg shadow-lg ">
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              setStartDate(dates[0]);
              setEndDate(dates[1]);
            }}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            inline
            dayClassName={(date) => {
              // Kiểm tra ngày Chủ nhật
              if (date.getDay() === 0) {
                return "text-red-500 font-semibold"; // Chủ nhật sẽ có màu đỏ
              }
            }}
            popperClassName="z-10"
          />
        </div>
      )}
    </div>
  );
};

export default CalendarFilter;
