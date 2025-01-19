import React, { useEffect, useState } from "react";
import AddSPUInfo from "../../../component/admin/addProduct/AddSPUInfo";
import AddVariationsInfo from "../../../component/admin/addProduct/AddVariationsInfo";
import AddAttributesInfo from "../../../component/admin/addProduct/AddAttributesInfo";
import { getProduct, createNewProduct, getCategoryIdByName } from "../../../config/api";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const initialProductData = {
  name: "",
  init_ThumbnailURL: "",
  hover_ThumbnailURL: "",
  description: "", 
  attributes: [], 
  category: "",
  shopRef: "674dac7725636fc3269ebe99", // Must be set appropriately
  variations: [], 
  sku_list: [], 
  types: [],
  types_ImageURL: [],
  isPublished: true,
}

const AddProductPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [productData, setProductData] = useState(initialProductData);


  // Hàm xử lý thay đổi chung cho input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const transformToTypes = () => {
    const { variations, sku_list } = productData;
    const types = [];

    // Find the index of "Màu sắc" variation
    const colorVariation = variations.find(v => v.name === "Màu sắc");
    const sizeVariation = variations.find(v => v.name === "Kích thước");

    if (!colorVariation || !sizeVariation) {
      console.error("Both 'Màu sắc' and 'Kích thước' variations are required.");
      return [];
    }

    console.log(variations)
    console.log(sku_list)

    colorVariation.options.forEach((color, colorIndex) => {
      // Placeholder for color images, modify as needed
      const colorSkus = sku_list.filter(sku => sku.sku_index[0] === colorIndex);
      const colorImages = colorSkus.length > 0 ? colorSkus[0].sku_imgs : [];
      
      console.log(colorImages)
      const type = {
        _id: uuidv4(),
        color_name: color,
        color_ImageURL: colorImages, // Add images from sku
        details: [],
      };

      sizeVariation.options.forEach((size, sizeIndex) => {
        // Find the corresponding SKU
        const sku = sku_list.find(
          skuItem =>
            skuItem.sku_index[0] === colorIndex &&
            skuItem.sku_index[1] === sizeIndex
        );

        if (sku) {
          type.details.push({
            _id: uuidv4(),
            size_name: size,
            price: sku.sku_price,
            sold: 0, 
            inStorage: parseInt(sku.sku_stock) || 0,
          });
        }
      });

      types.push(type);
    });

    return types;
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

  const handleCreateNew = async (productData) => {
    const removeIdsFromTypes = (types) => {
      return types.map(({ _id, details, ...type }) => ({
        ...type,
        details: details.map(({ _id, ...detail }) => ({
          ...detail,
        })),
      }));
    };

    // Transform attributes
    const transformedAttributes = productData.attributes.reduce((acc, attr) => {
      if (attr.name && attr.value) {
        acc[attr.name] = attr.value.trim();
      }
      return acc;
    }, {});

    // Rename category to categoryRef

    const types = removeIdsFromTypes(transformToTypes());
    const categoryResponse = await getCategoryIdByName(productData.category);
    const categoryId = categoryResponse.data.id;

    const payload = {
      ...productData,
      types: types,
      attributes: transformedAttributes,
      categoryRef: categoryId,

      // Remove unnecessary fields
      category:undefined,
      variations: undefined,
      sku_list: undefined,
      types_ImageURL: undefined,
    };

    try {
      console.log("🚀 ~ handleCreateNew ~ payload:", payload);
      // Gọi API để tạo sản phẩm mới
      const response = await createNewProduct(payload);
      // console.log("🚀 ~ handleCreateNew ~ response:", response);

      if (response.status === 201) {
        alert("Sản phẩm đã được tạo thành công!");
        window.location.reload();
        setProductData(initialProductData);
      }
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error.message);
      alert(
        "Đã xảy ra lỗi trong quá trình tạo sản phẩm. Vui lòng thử lại sau!"
      );
    }
  };

  // useEffect(() => {
  //   // Fetch and set shopRef appropriately, e.g., from user context or API
  //   const fetchShopRef = async () => {
  //     // Example: Assume you have a function to get the logged-in shop's ID
  //     const shopId = await getLoggedInShopId(); // Implement this function
  //     setProductData((prevData) => ({
  //       ...prevData,
  //       shopRef: shopId,
  //     }));
  //   };

  //   fetchShopRef();
  // }, []);

  const handleGetProduct = async (spu_id) => {
    try {
      const response = await getProduct(spu_id);
      if (response && response.metadata) {
        const product = response.metadata;
        console.log("🚀 ~ handleGetProduct ~ product:", product);
  
        const spu_info = product.spu_info;
        const sku_list = product.sku_list;
  
        // Map fetched types to the new types structure
        const mappedTypes = (product.types || []).map((type) => ({
          color_name: type.color_name || "",
          color_ImageURL: type.color_ImageURL || [],
          details: (type.details || []).map((detail) => ({
            size_name: detail.size_name || "",
            size_moreInfo: detail.size_moreInfo || "",
            price: detail.price || 0,
            sold: detail.sold || 0,
            inStorage: detail.inStorage || 0,
            sku: detail.sku || "",
          })),
        }));
  
        setProductData({
          ...productData,
          name: spu_info.product_name || "",
          category: product.product_category || "",
          description: spu_info.product_description || "",
          init_ThumbnailURL: spu_info.product_thumb || "",
          hover_ThumbnailURL: spu_info.product_hover_thumb || "",
          // Updated 'details' from string to key-value pairs
          details: spu_info.product_details || {},
          variations: spu_info.product_variations || [],
          sku_list: sku_list || [],
          attributes: spu_info.product_attributes || [],
          // Set 'types' with the mapped structure
          types: mappedTypes.length > 0 ? mappedTypes : [
            {
              color_name: "",
              color_ImageURL: [],
              details: [
                {
                  size_name: "",
                  size_moreInfo: "",
                  price: 0,
                  sold: 0,
                  inStorage: 0,
                  sku: "",
                },
              ],
            },
          ],
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
              details={productData.attributes}
              productData={productData}
              onUpdateAttributes={handleUpdateAttributes} // Truyền callback cho attributes
            />
          </div>
          <div className="mt-10 text-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => handleCreateNew(productData)}
              // onClick={() => console.log(productData)}
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
