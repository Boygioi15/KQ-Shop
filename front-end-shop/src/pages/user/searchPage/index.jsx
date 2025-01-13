import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useParams
import FilterSidebar from "../../../component/Product/FilterSidebar";
import ProductItem from "../../../component/Product/ProductItem";
import { AiOutlineSortAscending, AiOutlineRight } from "react-icons/ai";
import { getAllProductByCategory, searchProduct } from "../../../config/api";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("s");
  const [numberResult, setNumberResult] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [productList, setProductList] = useState([]);

  const handleGetListSearchProduct = async () => {
    const response = await searchProduct(searchTerm);
    if (response && response.status === 200) {
      console.log("🚀 ~ handleGetListSearchProduct ~ response:", response);

      setNumberResult(response.metadata.totalResult);
      const products = response.metadata.products.map((product) => ({
        id: product._id, // Hoặc _id, tùy theo cấu trúc của response
        name: product?.product_name,
        imageSrc: product?.product_thumb,
        productPrice: product?.product_price, // Hoặc thuộc tính hình ảnh phù hợp
        link: `/products/${product?.product_slug}`, // Giả sử slug là một thuộc tính trong API
      }));

      setProductList(products); // Cập nhật state categoryList
    }
  };
  useEffect(() => {
    handleGetListSearchProduct();
  }, [searchTerm]);

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen((prev) => !prev);
  };
  return (
    <section className="bg-[#f3f4f6] py-8 antialiased md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="flex gap-6">
          <FilterSidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Tìm thấy <strong>{numberResult}</strong> kết quả với từ khoá{" "}
                <strong>{searchTerm}</strong>
              </h3>
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
                      <button className="text-left w-full hover:bg-gray-100 px-2 py-1">
                        Nổi bật
                      </button>
                      <button className="text-left w-full hover:bg-gray-100 px-2 py-1">
                        Giá: Tăng dần
                      </button>
                      <button className="text-left w-full hover:bg-gray-100 px-2 py-1">
                        Giá: Giảm dần
                      </button>
                      <button className="text-left w-full hover:bg-gray-100 px-2 py-1">
                        Mới nhất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {/* Hiển thị các sản phẩm dựa trên loại */}
              {productList.map((product) => (
                <ProductItem product={product} isEdit={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
