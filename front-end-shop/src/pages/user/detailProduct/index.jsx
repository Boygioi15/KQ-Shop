import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductPrice from "../../../component/Product/ProductPrice"; // Import PromotionComponent
import ProductSideBar from "../../../component/Product/ProductSideBar";
import RatingStat from "../../../component/Product/Feedback/RatingStat";
import CommentSection from "../../../component/Product/Feedback/CommentSection";
import { addToCart, getProduct } from "../../../config/api";
import { FaCheck } from "react-icons/fa";
import ProductDescription from "../../../component/Product/ProductDescription";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DetailProduct = () => {
  const { productId } = useParams();
  const userId = useSelector((state) => state.account?.user?._id);

  const [isSidebarOpen, setSidebarOpen] = useState(false); // State cho Sidebar
  const [loading, setLoading] = useState(true);
  const [skus, setSkus] = useState([]);
  const [spu, setSpu] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState(
    skus.find((sku) => sku.sku_default)?.sku_index || [0, 0]
  );
  const [selectedImage, setSelectedImage] = useState();

  const commentSectionRef = useRef(null);
  const ratingStatRef = useRef(null);

  const selectedSku = skus.find((sku) =>
    sku.sku_index.every((index, i) => index === selectedVariants[i])
  );

  const handleGetProduct = async () => {
    setLoading(true);
    const response = await getProduct(productId);
    if (response.metadata && response.status === 200) {
      setSkus(response.metadata.sku_list);
      setSpu(response.metadata.spu_info);
    }
    setLoading(false);
  };

  const handleVariantChange = (variationIndex, optionIndex) => {
    const newSelectedVariants = [...selectedVariants];
    newSelectedVariants[variationIndex] = optionIndex;
    setSelectedVariants(newSelectedVariants);
  };

  const isVariantAvailable = (variationIndex, optionIndex) => {
    const potentialSelection = [...selectedVariants];
    potentialSelection[variationIndex] = optionIndex;

    const currentSku = skus.find((sku) =>
      sku.sku_index.every((index, i) => index === potentialSelection[i])
    );

    return currentSku !== undefined && currentSku.sku_stock !== 0;
  };
  const handleAddToCart = async () => {
    const response = await addToCart({ userId, skuId: selectedSku._id });
    if (response.status === 200) {
      toast.success("Add to cart success");
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  useEffect(() => {
    if (selectedSku?.sku_imgs?.length > 0) {
      setSelectedImage(selectedSku.sku_imgs[0]);
    }
  }, [selectedSku]);

  const scrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToRatingStat = () => {
    if (ratingStatRef.current) {
      ratingStatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <div className="font-sans ">
          <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-6 gap-12 p-6 rounded-lg bg-white">
              <div className="lg:col-span-3 w-full lg:sticky top-0 text-center ">
                <div className="px-4 py-10 rounded-lg relative">
                  <img
                    src={selectedImage}
                    alt="iPhone 16 Pro Max"
                    className="w-10/12 rounded object-cover mx-auto"
                  />
                  <button type="button" className="absolute top-4 right-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      fill="#ccc"
                      className="mr-1 hover:fill-[#333]"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                  {selectedSku?.sku_imgs.map((src, index) => (
                    <div
                      key={index}
                      className={`w-24 h-20 flex items-center justify-center rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        selectedImage === src
                          ? "shadow-[0_2px_10px_-3px_rgba(6,81,237,0.6)] border-2 border-mainColor scale-110"
                          : "shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:shadow-[0_2px_10px_-3px_rgba(6,81,237,0.5)] hover:scale-105"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Product ${index + 1}`}
                        className="w-full"
                        onClick={() => setSelectedImage(src)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="flex items-center space-x-2 mt-4">
                  {spu?.product_tags.map((value, index) => (
                    <div
                      key={index}
                      className="bg-mainColor text-white rounded-full px-4 py-1 flex items-center justify-center text-sm font-semibold shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
                    >
                      {value}
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-extrabold text-gray-800 mt-4">
                  {selectedSku?.sku_name}
                </h2>

                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-gray-600">No.{selectedSku?._id}</span>
                  <span className="text-gray-600">|</span>
                  <span
                    className="text-mainColor cursor-pointer"
                    onClick={scrollToRatingStat}
                  >
                    2 đánh giá
                  </span>
                  <span className="text-gray-600">|</span>
                  <span
                    className="text-mainColor cursor-pointer"
                    onClick={scrollToComments}
                  >
                    193 bình luận
                  </span>
                </div>

                {/* Variations */}
                <div className="space-y-5">
                  {spu?.product_variations.map((variation, variationIndex) => (
                    <div key={variationIndex}>
                      <h3 className="text-xl font-bold text-gray-800">
                        {variation.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-4">
                        {variation.options.map((option, optionIndex) => {
                          const isAvailable = isVariantAvailable(
                            variationIndex,
                            optionIndex
                          );
                          return (
                            <button
                              key={optionIndex}
                              className={`flex justify-center items-center relative px-2 py-1 border rounded-lg 
                          ${
                            !isAvailable
                              ? "opacity-50 disabled:cursor-not-allowed"
                              : "cursor-pointer"
                          }
                          ${
                            selectedVariants[variationIndex] === optionIndex
                              ? "border-mainColor"
                              : "border-gray-300"
                          }`}
                              disabled={!isAvailable}
                              onClick={() =>
                                handleVariantChange(variationIndex, optionIndex)
                              }
                            >
                              {variation.images.length > 0 && (
                                <img
                                  src={variation.images[optionIndex]}
                                  className="w-8 h-8"
                                />
                              )}
                              <span className="text-base font-semibold text-gray-800 p-2">
                                {option}
                              </span>
                              {selectedVariants[variationIndex] ===
                                optionIndex && (
                                <span
                                  className="absolute top-0 right-0 w-7 h-7 bg-mainColor flex items-center justify-center rounded-tr-lg"
                                  style={{
                                    clipPath:
                                      "polygon(100% 0, 0% 0, 100% 100%)",
                                    transform: "translate(1px, -1px)",
                                  }}
                                >
                                  <FaCheck
                                    className="text-white text-xs"
                                    style={{
                                      transform: "translate(5px, -5px)",
                                    }}
                                  />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Khuyến mãi */}
                <div className="flex flex-wrap gap-4 mt-8">
                  <ProductPrice
                    price={selectedSku?.sku_price?.originalPrice || 0}
                    discountPrice={0}
                    points={
                      selectedSku?.loyalPointRate *
                        selectedSku?.sku_price.originalPrice || 0
                    }
                  />
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    type="button"
                    className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
                  >
                    Buy now
                  </button>
                  <button
                    type="button"
                    className="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            <ProductDescription
              description={spu?.product_description}
              onClickThongSo={() => setSidebarOpen(true)}
            />
            <div className="mt-16 bg-white border-2  rounded-lg p-6 space-y-10">
              <div ref={ratingStatRef}>
                <RatingStat />
              </div>
              <div ref={commentSectionRef}>
                <CommentSection />
              </div>
            </div>
            {/* Sidebar */}
            <ProductSideBar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
