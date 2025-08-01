import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findProducts } from "../../../Redux/Customers/Product/Action";
import HomeProductSection from "../Home/HomeProductSection";
import { navigation } from "../../../config/navigationMenu";
import { Helmet } from "react-helmet-async";

const SecondLevelProductList = () => {
  const { levelOne, levelTwo } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const readableTitle = levelTwo.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const pageUrl = `https://www.fluteon.com/${levelOne}/${levelTwo}`;

  useEffect(() => {
    const loadProducts = async () => {
      const currentCategory = navigation.categories.find((cat) => cat.id === levelOne);
      if (!currentCategory) return;

      const section = currentCategory.sections.find((sec) => sec.id === levelTwo);
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
      {/* ✅ SEO Helmet for dynamic category */}
      <Helmet>
        <title>{`${readableTitle} for Women | Fluteon`}</title>
        <meta
          name="description"
          content={`Explore latest collection of ${readableTitle} for women. Shop affordable and premium fashion online at Fluteon.`}
        />
        <meta
          name="keywords"
          content={`${readableTitle}, women's ${readableTitle}, Fluteon, fashion, shopping, online store`}
        />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      {/* ✅ Semantic heading */}
      <h1 className="text-2xl font-bold capitalize mb-4 text-gray-800">{readableTitle}</h1>

      {/* ✅ Product list or fallback */}
      {products.length > 0 ? (
        <HomeProductSection section={`Results in ${readableTitle}`} data={products} />
      ) : (
        <p className="text-gray-500 text-center mt-10">No products found in this category.</p>
      )}
    </div>
  );
};

export default SecondLevelProductList;
