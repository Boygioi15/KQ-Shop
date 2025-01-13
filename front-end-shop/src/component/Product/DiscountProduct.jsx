import { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductItem from './ProductItem'; // Đảm bảo đường dẫn đúng với vị trí của ProductCard

const DiscountProduct = () => {
  const scrollRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Số lượng sản phẩm muốn hiển thị
  const totalProductsToShow = 4;

  useEffect(() => {
    // Đo chiều rộng của một ProductItem sau khi render
    const updateCardWidth = () => {
      if (scrollRef.current) {
        const firstCard = scrollRef.current.firstChild;
        if (firstCard) {
          setCardWidth(firstCard.offsetWidth + 16); // Chiều rộng của ProductItem cộng với khoảng cách giữa các sản phẩm
        }
      }
    };

    // Cập nhật chiều rộng khi component mount
    updateCardWidth();
    // Cập nhật chiều rộng khi cửa sổ thay đổi kích thước
    window.addEventListener('resize', updateCardWidth);

    return () => {
      window.removeEventListener('resize', updateCardWidth);
    };
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  return (
    <div 
      className="p-4 relative rounded-lg" 
      style={{ backgroundImage: 'url("https://img.lovepik.com/background/20211021/large/lovepik-background-of-black-line-science-and-technology-image_500425114.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Mua Online giá siêu rẻ</h2>
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
      >
        <FaChevronLeft />
      </button>
      <div
        className="flex space-x-4 overflow-hidden"
        ref={scrollRef}
      >
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex-none" style={{ width: `calc((100% - ${16 * (totalProductsToShow - 1)}px) / ${totalProductsToShow})` }}>
            <ProductItem />
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default DiscountProduct;
