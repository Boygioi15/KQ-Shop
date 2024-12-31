import axios from "./axios_custom";

/* Module Auth */
export const callLogin = async (email, password) => {
  return axios.post("/auth/sign-in", { email, password });
};
export const callSignUp = async (email) => {
  return axios.post("/auth/sign-up", { email });
};
export const callLogout = () => {
  return axios.post("/auth/log-out");
};

export const callLoginGG = () => {
  return axios.post("/auth/google");
};

export const callAccount = async () => {
  return axios.get("/auth/account");
};

/*Category*/
export const getAllCategory = async () => {
  return axios.get("/category");
};

/*Product*/
export const getAllProductByCategory = async (categorySlug) => {
  return axios.post("/product/published/all", {
    categorySlug,
  });
};
export const getProduct = async (spu_id) => {
  return axios.get("/product/spu", {
    params: {
      spu_id,
    },
  });
};

export const searchProduct = async (textSearch) => {
  return axios.get("/full-text-search", {
    params: {
      textSearch,
    },
  });
};

export const suggestionSearchProduct = async (textSearch) => {
  return axios.get("/full-text-search/autocomplete", {
    params: {
      textSearch,
    },
  });
};

// Cart

export const addToCart = async ({ userId, skuId, quantity = 1 }) => {
  return axios.post("/cart", { userId, skuId, quantity });
};

export const deleteItemInCart = async ({ userId, skuId }) => {
  return axios.delete("/cart", {
    data: { userId, skuId }, // Đưa payload vào thuộc tính `data`
  });
};

export const getCartItemList = async (userId) => {
  return axios.get("/cart", {
    params: {
      userId,
    },
  });
};

export const updateQuantity = async ({ userId, item_products }) => {
  return axios.post("/cart/update", { userId, item_products });
};

//  Checkout
export const getCheckout = async ({
  cartId = "6757bcb643aba0bc50e3e44e",
  userId,
  shop_discount = [],
  products_order = [],
}) => {
  return axios.post("/checkout/review", {
    cartId,
    userId,
    shop_discount,
    products_order,
  });
};

//Image
export const getImageLink = async (formData) => {
  try {
    const response = await axios.post("/upload/product/thumb", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Đảm bảo content-type là multipart/form-data
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi ảnh:", error);
    throw error;
  }
};

//ProductStock
export const getAllProduct = async () => {
  return axios.get("/product/spu/get-all");
};
export const getPublishedProduct = async () => {
  return axios.get("/product/spu/get-published");
};
export const getDraftProduct = async () => {
  return axios.get("/product/spu/get-draft");
};

//ProductAdd
export const createNewProduct = async (productData) => {
  return axios.post("/product", { productData });
};
