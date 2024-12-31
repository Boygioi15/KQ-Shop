import { Link } from "react-router-dom";
import CategorySection from "./CategorySection";
import { getAllCategory } from "../../../config/api";
import { useEffect, useState } from "react";

const ProductCategory = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await getAllCategory();
      if (response.status === 200 && response.metadata) {
        const categories = response.metadata.map((category) => ({
          id: category._id,
          name: category.category_name,
          imageSrc: category.category_img,
          link: `/${category.category_slug}`,
        }));

        setCategoryList(categories);
      }
    } catch (error) {
      console.error("Get categories error:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:flex lg:justify-around lg:gap-0">
      {categoryList.map((category) => (
        <Link key={category.id} to={category.link}>
          <CategorySection
            categoryName={category.name}
            imageSrc={category.imageSrc}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductCategory;
