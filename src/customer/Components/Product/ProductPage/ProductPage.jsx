import React from "react";
import { productdata } from "../../../data";
import ProductCard from "../ProductCard/ProductCard";
import { Helmet } from "react-helmet-async";

const ProductPage = () => {
  return (
    <div className="px-10 -z-10">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Shop Formal Pants & Bottomwear for Women | Fluteon</title>
        <meta
          name="description"
          content="Explore our exclusive collection of formal pants, trousers, and bottomwear for women. Shop premium styles at affordable prices only on Fluteon."
        />
        <meta
          name="keywords"
          content="formal pants for women, bottomwear, women trousers, Fluteon fashion, cotton pants, office wear"
        />
        <link
          rel="canonical"
          href="https://www.fluteon.com/women/bottom_wear/formal_pants"
        />
      </Helmet>

      {/* ✅ Heading Section */}
      <div className="flex justify-between py-5 items-center">
        <h1 className="text-2xl font-bold text-gray-800">Formal Pants</h1>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-600">Filter</span>
          <span className="font-semibold text-gray-600">Sort</span>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="flex justify-between">
        {/* Filter Sidebar */}
        <aside className="w-[20%] border rounded-md bg-white p-4" aria-label="Filters">
          {/* You can add filters later here */}
          <h2 className="text-lg font-semibold mb-2">Filters</h2>
        </aside>

        {/* Product Grid */}
        <section
          className="flex flex-wrap justify-between w-[78%] bg-white border p-5 rounded-md"
          aria-label="Product Listing"
        >
          {productdata.map((item) => (
            <ProductCard key={item._id || item.title} product={item} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
