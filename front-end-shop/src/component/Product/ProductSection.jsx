import { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductItem from './ProductItem';

const ProductSection = ({ title }) => {
  const scrollRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  const totalProductsToShow = 4;

  useEffect(() => {
    const updateCardWidth = () => {
      if (scrollRef.current) {
        const firstCard = scrollRef.current.firstChild;
        if (firstCard) {
          setCardWidth(firstCard.offsetWidth + 16);
        }
      }
    };

    updateCardWidth();
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
    <div className="p-6 relative shadow-2xl bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">{title}</h2>
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full shadow-lg text-lg"
      >
        <FaChevronLeft />
      </button>
      <div className="flex space-x-4 overflow-hidden" ref={scrollRef}>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex-none"
            style={{ width: `calc((100% - ${16 * (totalProductsToShow - 1)}px) / ${totalProductsToShow})` }}
          >
            <ProductItem />
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full shadow-lg text-lg"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ProductSection;
