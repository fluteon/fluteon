import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findProducts } from "../../../Redux/Customers/Product/Action";
import HomeProductSection from "../Home/HomeProductSection";
import { navigation } from "../../../config/navigationMenu"; // adjust this

const SecondLevelProductList = () => {
  const { levelOne, levelTwo } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const currentCategory = navigation.categories.find(
        (cat) => cat.id === levelOne
      );
      if (!currentCategory) return;

      const section = currentCategory.sections.find(
        (sec) => sec.id === levelTwo
      );
      if (!section) return;

      const allProducts = [];

      for (const item of section.items) {
        const res = await dispatch(
          findProducts({
            category: item.id,
            pageNumber: 1,
            pageSize: 20,
          })
        );
        if (res?.content) {
          allProducts.push(...res.content);
        }
      }

      setProducts(allProducts);
    };

    loadProducts();
  }, [levelOne, levelTwo, dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold capitalize mb-4">
        {levelTwo.replace("_", " ")}
      </h2>
      <HomeProductSection section={`Results in ${levelTwo}`} data={products} />
    </div>
  );
};

export default SecondLevelProductList;
