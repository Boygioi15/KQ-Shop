import React, { useState, useEffect } from "react";
import VariationForm from "./VariationForm";
import SkuTable from "./SkuTable";
import { formatNumber, parseNumber } from "../../../utils/format";
import { getImageLink } from "../../../config/api";

const AddVariationsInfo = ({
  productData,
  onUpdateVariations,
  onUpdateSkuList,
}) => {
  const [variationsList, setVariationsList] = useState([
    { id: 1, name: "Màu sắc", options: [] },
    { id: 2, name: "Kích thước", options: [] },
  ]);
  const [sku_list, setSku_list] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [price, setPrice] = useState(""); // Giá cho tất cả các SKU
  const [stock, setStock] = useState(""); // Kho cho tất cả các SKU

  useEffect(() => {
    if (productData.variations && productData.variations.length > 0) {
      setVariationsList(productData.variations);
    }
    if (productData.sku_list && productData.sku_list.length > 0) {
      const updatedSkuList = productData.sku_list.map((sku) => ({
        ...sku,
        sku_price: sku.sku_price.originalPrice || 0,
      }));

      setSku_list(updatedSkuList);
    }
  }, [productData]);
  // Cập nhật variations và gọi callback
  const setVariationsListAndUpdate = (newVariationsList) => {
    setVariationsList(newVariationsList);
    onUpdateVariations(newVariationsList); // Cập nhật dữ liệu lên component cha
    generateSkuList(newVariationsList);
  };

  // Cập nhật sku_list và gọi callback
  const setSkuListAndUpdate = (newSkuList) => {
    setSku_list(newSkuList);
    onUpdateSkuList(newSkuList); // Cập nhật dữ liệu lên component cha
  };

  const handleOptionChange = (variationIndex, optionIndex, value) => {
    const updatedVariations = variationsList.map((variation, i) => {
      if (i === variationIndex) {
        const updatedOptions = [...variation.options];
        updatedOptions[optionIndex] = value;
        return { ...variation, options: updatedOptions };
      }
      return variation;
    });
    setVariationsListAndUpdate(updatedVariations);
  };

  const addOption = (variationIndex) => {
    const updatedVariations = variationsList.map((variation, i) => {
      if (
        i === variationIndex &&
        variation.options[variation.options.length - 1] !== ""
      ) {
        return { ...variation, options: [...variation.options, ""] };
      }
      return variation;
    });
    setVariationsListAndUpdate(updatedVariations);
  };

  const removeOption = (variationIndex, optionIndex) => {
    const updatedVariations = variationsList.map((variation, i) => {
      if (i === variationIndex) {
        const updatedOptions = variation.options.filter(
          (_, idx) => idx !== optionIndex
        );
        return { ...variation, options: updatedOptions };
      }
      return variation;
    });
    setVariationsListAndUpdate(updatedVariations);
  };

  const handlePriceChange = (skuIndexId, value) => {
    const updatedSkuList = sku_list.map((sku, i) =>
      i === skuIndexId ? { ...sku, sku_price: value } : sku
    );
    setSkuListAndUpdate(updatedSkuList);
  };
  const handleStockChange = (skuIndexId, value) => {
    const updatedSkuList = sku_list.map((sku, i) =>
      i === skuIndexId ? { ...sku, sku_stock: value } : sku
    );
    setSkuListAndUpdate(updatedSkuList);
  };

  const handleImageUpload = async (skuIndexId, event) => {
    const updatedSkuList = [...sku_list];
    const files = Array.from(event.target.files); // Convert FileList to array

    if (files.length === 0) return; // No files selected

    setIsUploading(true); // Start uploading

    try {
      const uploadedImageUrls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);

          const response = await getImageLink(formData);
          
          if (response) {
            return response.imageUrl;
          } else {
            throw new Error("Failed to upload image");
          }
        })
      );

      updatedSkuList[skuIndexId].sku_imgs = [
        ...updatedSkuList[skuIndexId].sku_imgs,
        ...uploadedImageUrls,
      ];

      setSku_list(updatedSkuList);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Đã xảy ra lỗi khi tải lên hình ảnh. Vui lòng thử lại.");
    } finally {
      setIsUploading(false); // End uploading
      event.target.value = null; // Reset the input
    }
  };

  const handleRemoveImage = (skuIndexId, imgIndex) => {
    const updatedSkuList = [...sku_list];
    updatedSkuList[skuIndexId].sku_imgs.splice(imgIndex, 1); // Xóa ảnh tại chỉ số imgIndex
    setSku_list(updatedSkuList);
  };

  const generateSkuList = (variations = variationsList) => {
    const skuList = [];
    const optionsCount = variations.map(
      (variation) => variation.options.length
    );
    const totalCombinations = optionsCount.reduce(
      (acc, count) => acc * count,
      1
    );

    for (let i = 0; i < totalCombinations; i++) {
      const skuIndex = [];
      let combinationIndex = i;

      variations.forEach((variation) => {
        const optionIndex = combinationIndex % variation.options.length;
        skuIndex.push(optionIndex);
        combinationIndex = Math.floor(
          combinationIndex / variation.options.length
        );
      });

      skuList.push({
        sku_index: skuIndex,
        sku_price: "",
        sku_stock: "",
        sku_imgs: [],
      });
    }

    setSkuListAndUpdate(skuList);
  };
  const applyToAll = () => {
    const updatedSkuList = sku_list.map((sku) => ({
      ...sku,
      sku_price: price,
      sku_stock: stock,
    }));
    setSkuListAndUpdate(updatedSkuList);
  };

  useEffect(() => {
    if (!productData.sku_list || !productData.sku_list.length > 0) {
      generateSkuList();
    }
  }, [variationsList]);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Thông tin phân loại SKU</h2>
      <div className="md:p-10 p-0">
        <div className="flex flex-col md:flex-row ">
          <label className="w-32">Phân loại hàng</label>
          <div className="md:ml-10 ml-0 mt-5 md:mt-0 w-full">
            <div>
              {variationsList.length > 0 && (
                <div>
                  {variationsList.map((variation, index) => (
                    <VariationForm
                      key={index}
                      variation={variation}
                      index={index}
                      onOptionChange={handleOptionChange}
                      onAddOption={addOption}
                      onRemoveOption={removeOption}
                    />
                  ))}
                </div>
              )}
              {variationsList.length > 0 && (
                <>
                  <div className="mt-4 flex flex-col md:flex-row gap-4">
                    {/* Giá */}
                    <div className="flex items-center md:flex-col md:items-start w-full md:w-1/2 gap-x-4 md:gap-y-2">
                      <label className="font-medium w-24 md:w-full">Giá</label>
                      <input
                        type="text"
                        value={formatNumber(price) || ""}
                        onChange={(e) => {
                          const rawValue = parseNumber(e.target.value);
                          setPrice(rawValue);
                        }}
                        className="w-full md:w-full p-2 border rounded"
                      />
                    </div>

                    {/* Kho hàng */}
                    <div className="flex items-center md:flex-col md:items-start w-full md:w-1/2 gap-x-4 md:gap-y-2">
                      <label className="font-medium w-24 md:w-full">
                        Kho hàng
                      </label>
                      <input
                        type="number"
                        value={stock || ""}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full md:w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <button
                    onClick={applyToAll}
                    className="mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Áp dụng cho tất cả
                  </button>
                </>
              )}

              {variationsList.length > 0 && (
                <SkuTable
                  skuList={sku_list}
                  variationsList={variationsList}
                  onPriceChange={handlePriceChange}
                  onStockChange={handleStockChange}
                  onImageUpload={handleImageUpload}
                  onRemoveImage={handleRemoveImage}
                />
              )}
            </div>
          </div>
        </div>
        {variationsList.length === 0 && (
          <>
            <div className="mt-4 flex flex-col gap-y-6">
              {/* Giá */}
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 md:gap-y-0">
                <label className="font-medium w-32">Giá</label>
                <input
                  type="text"
                  value={formatNumber(price) || ""}
                  onChange={(e) => {
                    const rawValue = parseNumber(e.target.value);
                    setPrice(rawValue);
                  }}
                  className="md:ml-4 w-full md:w-1/3 p-2 border rounded"
                />
              </div>

              {/* Kho hàng */}
              <div className="flex flex-col md:flex-row md:items-center gap-y-2 md:gap-y-0">
                <label className="font-medium w-32">Kho hàng</label>
                <input
                  type="number"
                  value={stock || ""}
                  onChange={(e) => setStock(e.target.value)}
                  className="md:ml-4 w-full md:w-1/3 p-2 border rounded"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddVariationsInfo;
