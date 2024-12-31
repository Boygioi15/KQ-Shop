import { useState, useCallback, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce"; // Import debounce
import { suggestionSearchProduct } from "../config/api";
import { Link, useNavigate } from "react-router-dom";

const Search = ({ className }) => {
  const [textSearch, setTextSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const dropdownRef = useRef(null); // Sử dụng ref để theo dõi dropdown
  const inputRef = useRef(null); // Sử dụng ref để theo dõi input

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Hàm debounce để tìm kiếm
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      const response = await suggestionSearchProduct(term);
      if (response && response.status === 200) {
        const filteredSuggestions = response.metadata;
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  const handleChange = (e) => {
    setTextSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleSelectSuggestion = (suggestion) => {
    setTextSearch(suggestion.name); // Cập nhật giá trị của input với tên của gợi ý
    setShowDropdown(false); // Ẩn dropdown sau khi chọn suggestion
  };

  useEffect(() => {
    // Lắng nghe sự kiện click trên document
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false); // Ẩn dropdown nếu người dùng click ra ngoài input và dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (textSearch) {
        setShowDropdown(false);
        navigate(`/tim-kiem?s=${textSearch}`);
      }
    }
  };
  return (
    <form
      className={`flex-1 items-center ${className}`}
      onSubmit={handleSearch}
    >
      <div className="relative w-full">
        <FaSearch className="absolute left-3 top-2.5 text-gray-500" />{" "}
        <input
          ref={inputRef}
          type="text"
          value={textSearch}
          onChange={handleChange}
          placeholder="Nhập vào tên thiết bị cần tìm"
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none"
        />
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-10"
            id="suggest"
          >
            <ul className="py-2 text-sm text-gray-700">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    <Link
                      to={`/tim-kiem?s=${suggestion.name}`}
                      onClick={() => setShowDropdown(false)}
                      className="block cursor-pointer"
                    >
                      {suggestion.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">Không có kết quả</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};

export default Search;
