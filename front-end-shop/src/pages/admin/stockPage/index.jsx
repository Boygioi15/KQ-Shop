import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineDown,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import {
  getAllProduct
} from "../../../config/api";
import ProductFilter from "../../../component/admin/stockProduct/ProductFilter";
import ProductTable from "../../../component/admin/stockProduct/ProductTable";
import { formatVND } from "../../../utils/format";
import Loading from "../../../component/Loading";
import { Link, useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 8;

const StockPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    stockStatus: "",
    category: "",
    seller: "",
    productType: "",
  });
  const [activeTab, setActiveTab] = useState("all");
  const [activeCollapse, setActiveCollapse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [allCount, setAllCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);

  useEffect(() => {
    fetchTabCounts();
    fetchTabData();
  }, [activeTab]);

  useEffect(() =>  {
    handleFilterProducts();
  }, [filters, products]);

  const handleStatusChanged = async (productId, newStatus) => {
    try {
      setIsLoading(true);
      await fetchTabCounts();
      await fetchTabData();
    } catch (error) {
      console.error("Error updating after status change:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductDeleted = async (deletedProductId) => {
    try {
      setIsLoading(true);
      // Remove from local state first for immediate UI update
      setProducts(prevProducts => 
        prevProducts.filter(p => p._id !== deletedProductId)
      );
      setFilteredProducts(prevFiltered => 
        prevFiltered.filter(p => p._id !== deletedProductId)
      );

      // Refresh data from server
      await fetchTabCounts();
      await fetchTabData();
    } catch (error) {
      console.error("Error updating after deletion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTabCounts = async () => {
    setIsLoading(true); // Bật trạng thái loading
    try {
      const allResponse = await getAllProduct();
      setAllCount(allResponse?.data?.length || 0);

      const publishedResponse = await getAllProduct(true);
      setPublishedCount(publishedResponse?.data?.length || 0);

      const draftResponse = await getAllProduct(false);
      setDraftCount(draftResponse?.data?.length || 0);
    } catch (error) {
      console.error("Error fetching counts:", error);
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };

  const fetchTabData = async () => {
    setIsLoading(true); // Bật trạng thái loading
    try {
      let response;
      if (activeTab === "all") response = await getAllProduct();
      if (activeTab === "published") response = await getAllProduct(true);
      if (activeTab === "draft") response = await getAllProduct(false);

      if (response && response.data) {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setCurrentPage(1);
        console.log(products)
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };

  const handleFilterProducts = () => {
    let filtered = [...products];
    if (filters.stockStatus) {
      filtered = filtered.filter(
        (product) => product.product_stockStatus === filters.stockStatus
      );
    }
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }
    if (filters.seller) {
      filtered = filtered.filter(
        (product) => product.seller === filters.seller
      );
    }
    if (filters.productType) {
      filtered = filtered.filter(
        (product) => product.product_type === filters.productType
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const paginatedProducts = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const toggleCollapse = (id) => {
    setActiveCollapse((prev) => (prev === id ? null : id));
  };
  const navigate = useNavigate();
  const handleEditProduct = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between bg-white px-6 py-8 rounded-lg items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-700">Quản lý sản phẩm</h1>
        <Link
          to="/products/add"
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md"
        >
          <BiPlus className="mr-2 text-xl" /> Thêm sản phẩm
        </Link>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading />
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex gap-4 mb-4 border-b pb-2">
            {[
              { label: "Tất cả", value: "all", count: allCount },
              { label: "Đang bán", value: "published", count: publishedCount },
              { label: "Đã tạm ngưng", value: "draft", count: draftCount },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`font-semibold px-4 py-2 rounded-t ${
                  activeTab === tab.value
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Product Table */}
          <div className="hidden md:block">
            <ProductTable 
              products={paginatedProducts()}
              onProductDeleted={handleProductDeleted} 
              onStatusChanged={handleStatusChanged}
            />
          </div>

          {/* Collapse View for Small Screens */}
          <div className="md:hidden">
            {paginatedProducts().map((product) => (
              <div
                key={product._id}
                className="bg-white shadow rounded-lg mb-4 p-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        product.product_thumb ||
                        "https://via.placeholder.com/50"
                      }
                      className="h-12 w-12 rounded"
                      alt={product.product_name}
                    />
                    <div>
                      <p className="font-semibold text-gray-700">
                        {product.product_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatVND(product.product_price?.orignalPrice)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AiOutlineEdit
                      onClick={() => handleEditProduct(product._id)}
                      className="text-blue-500 cursor-pointer"
                    />

                    <AiOutlineDelete className="text-red-500 cursor-pointer" />
                    <AiOutlineDown
                      className={`text-gray-500 ${
                        activeCollapse === product._id ? "rotate-180" : ""
                      } transition-transform cursor-pointer`}
                      onClick={() => toggleCollapse(product._id)}
                    />
                  </div>
                </div>
                {activeCollapse === product._id && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-700 font-medium">Số lượng:</p>
                      <p className="text-gray-800 font-semibold">
                        {product.product_quantity}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-700 font-medium">Danh mục:</p>
                      <p className="text-gray-800 font-semibold">
                        {product.product_category
                          .map((category) => category.category_name)
                          .join(", ")}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-700 font-medium">Giá:</p>
                      <p className="text-blue-500 font-bold">
                        {formatVND(product.product_price?.orignalPrice)}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 font-medium">Seller:</p>
                      <p className="text-gray-800 font-semibold">
                        {product.seller}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <ul className="flex space-x-5 justify-center font-[sans-serif] mt-6">
          {/* Previous Button */}
          <li
            className={`flex items-center justify-center shrink-0 bg-gray-100 w-9 h-9 rounded-md cursor-pointer ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            <AiOutlineLeft className="text-gray-500" />
          </li>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <li
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold px-[13px] h-9 rounded-md ${
                  currentPage === page
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border text-gray-800 hover:border-blue-500"
                }`}
              >
                {page}
              </li>
            )
          )}

          {/* Next Button */}
          <li
            className={`flex items-center justify-center shrink-0 bg-gray-100 w-9 h-9 rounded-md cursor-pointer ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
          >
            <AiOutlineRight className="text-gray-500" />
          </li>
        </ul>
      )}
    </div>
  );
};

export default StockPage;
