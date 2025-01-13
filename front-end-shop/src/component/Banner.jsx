import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import các icon
import useWindowSize from "../utils/useWindowSize";

const Banner = () => {
  // Danh sách hình ảnh
  const images = [
    "https://cdn2.fptshop.com.vn/unsafe/750x0/filters:quality(100)/desk_header_c7ad8b92b8.png",
    "https://cdn2.fptshop.com.vn/unsafe/2000x0/filters:quality(100)/desk_header_c7ad8b92b8.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const { height, width } = useWindowSize();
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000); // Thay đổi mỗi 7 giây
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [currentIndex]); // Chỉ cần một lần chạy khi component mount

  return (
    <div
      id="default-carousel"
      className="relative px-10 w-full h-auto overflow-hidden"
    >
      <img
        src={`https://cdn2.fptshop.com.vn/unsafe/${width}x0/filters:quality(100)/mb_header_bg_44415b50e9.png`}
        className="absolute w-full h-auto top-0 left-0 right-0"
      ></img>
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg lg:h-96">
        {/* Hình ảnh */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-700 ease-in-out  
            ${
              index === currentIndex
                ? "translate-x-0"
                : index > currentIndex
                ? "translate-x-full"
                : index < currentIndex
                ? "-translate-x-full"
                : "hidden"
            }`}
          >
            <img
              src={image}
              className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-300"
            }`}
            aria-current={currentIndex === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <FaArrowLeft className="w-4 h-4 text-white" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <FaArrowRight className="w-4 h-4 text-white" />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Banner;
