import React, { useEffect, useState } from "react";
import AddSPUInfo from "../../../component/admin/addProduct/AddSPUInfo";
import AddVariationsInfo from "../../../component/admin/addProduct/AddVariationsInfo";
import AddAttributesInfo from "../../../component/admin/addProduct/AddAttributesInfo";
import { getProduct, createNewProduct } from "../../../config/api";
import { useParams } from "react-router-dom";

const AddProductPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [productData, setProductData] = useState({
    name: "",
    category: [], // Lưu giá trị category
    description: "",
    tags: [],
    thumb: null,
    variations: [],
    sku_list: [],
    attributes: [],
  });

  

  // Hàm xử lý thay đổi chung cho input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm xử lý khi `attributes` thay đổi
  const handleUpdateAttributes = (updatedAttributes) => {
    setProductData((prev) => ({
      ...prev,
      attributes: updatedAttributes,
    }));
  };

  // Hàm xử lý khi `variations` thay đổi
  const handleUpdateVariations = (updatedVariations) => {
    setProductData((prev) => ({
      ...prev,
      variations: updatedVariations,
    }));
  };

  // Hàm xử lý khi `sku_list` thay đổi
  const handleUpdateSkuList = (updatedSkuList) => {
    setProductData((prev) => ({
      ...prev,
      sku_list: updatedSkuList,
    }));
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true); // Bật trạng thái loading
      handleGetProduct(id).finally(() => setIsLoading(false)); // Tắt loading
    }
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Thêm logic submit dữ liệu lên server tại đây
    console.log("Submitting product data:", productData);
  };
  const handleCreateNew = async (productData) => {
    console.log("🚀 ~ handleCreateNew ~ productData:", productData);
    try {
      // Gọi API để tạo sản phẩm mới
      const response = await createNewProduct(productData);
      console.log("🚀 ~ handleCreateNew ~ response:", response);

      if (response && response.success) {
        console.log("Sản phẩm đã được tạo thành công:", response);
        alert("Sản phẩm đã được tạo thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error.message);
      alert(
        "Đã xảy ra lỗi trong quá trình tạo sản phẩm. Vui lòng thử lại sau!"
      );
    }
  };

  const handleGetProduct = async (spu_id) => {
    try {
      const response = await getProduct(spu_id);
      if (response && response.metadata) {
        const product = response.metadata;
        console.log("🚀 ~ handleGetProduct ~ product:", product);

        const spu_info = product.spu_info;
        const sku_list = product.sku_list;

        setProductData({
          ...productData,
          name: spu_info.product_name || "",
          category: product.product_category || "",
          description: spu_info.product_description || "",
          tags: spu_info.product_tags || [],
          thumb: spu_info.product_thumb || null,
          variations: spu_info.product_variations || [],
          sku_list: sku_list || [],
          attributes: spu_info.product_attributes || [],
        });
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <div className="p-6">
      {isLoading ? (
        <div className="text-center text-gray-500">Loading product data...</div>
      ) : (
        <>
          <AddSPUInfo
            productData={productData}
            handleChange={handleChange}
            setProductData={setProductData}
            handleSubmit={handleSubmit}
          />

          <div className="mt-10">
            <AddVariationsInfo
              productData={productData}
              onUpdateVariations={handleUpdateVariations} // Truyền callback cho variations
              onUpdateSkuList={handleUpdateSkuList} // Truyền callback cho sku_list
            />
          </div>

          <div className="mt-10">
            <AddAttributesInfo
              category={productData.category}
              productData={productData}
              onUpdateAttributes={handleUpdateAttributes} // Truyền callback cho attributes
            />
          </div>
          <div className="mt-10 text-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handleCreateNew(productData)}
            >
              Tạo mới
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddProductPage;
