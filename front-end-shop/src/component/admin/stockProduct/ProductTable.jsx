import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { formatVND } from "../../../utils/format";

const ProductTable = ({ products }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB").format(date); // dd/mm/yyyy
  };

  return (
    <div className="hidden md:block">
      <table className="w-full bg-white table-auto shadow-md rounded-lg">
        <thead className="rounded-t-lg">
          <tr className="bg-white">
            <th className="p-5 text-left rounded-full">Image</th>
            <th className="p-5 text-left">Product Name</th>
            <th className="p-5 text-left">Stock</th>
            <th className="p-5 text-left">Price</th>
            <th className="p-5 text-left">Category</th>
            <th className="p-5 text-left hidden lg:table-cell">Tags</th>
            <th className="p-5 text-left hidden lg:table-cell">Review</th>
            <th className="p-5 text-left">Date</th>
            <th className="p-5 text-center rounded-full">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="p-5 border-b">
                <img
                  src={
                    product.product_thumb || "https://via.placeholder.com/50"
                  }
                  className="h-10 w-10 rounded"
                  alt={product.product_name}
                />
              </td>
              <td className="p-5 border-b text-mainColor font-semibold">
                {product.product_name}
              </td>
              <td
                className={`p-5 border-b ${
                  product.product_quantity > 10
                    ? "text-green-500"
                    : product.product_quantity > 0
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {product.product_stockStatus} ({product.product_quantity})
              </td>
              <td className="p-5 border-b">
                {formatVND(product.product_price?.orignalPrice)}
              </td>
              <td className="p-5 border-b text-mainColor">
                {product.product_category
                  .map((category) => category.category_name)
                  .join(", ")}
              </td>

              <td className="p-5 border-b text-mainColor hidden lg:table-cell">
                {Array.isArray(product.product_tags)
                  ? product.product_tags.join(", ")
                  : "-"}
              </td>
              <td className="p-5 border-b hidden lg:table-cell">
                {product.product_ratingAverage !== null &&
                product.product_ratingAverage !== undefined
                  ? product.product_ratingAverage
                  : "-"}{" "}
                &#9733;
              </td>

              <td className="p-5 border-b text-gray-700 font-semibold">
                {formatDate(product.createdAt)}
              </td>
              <td className="p-5 border-b text-center">
                <div className="flex justify-center items-center gap-x-2">
                  <AiOutlineEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                  <AiOutlineDelete className="text-red-500 cursor-pointer hover:text-red-700" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
