

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  console.log("products....", product);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect to change image automatically
  useEffect(() => {
    let interval;
    if (product?.imageUrl && product.imageUrl.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % product.imageUrl.length
        );
      }, 3000); 
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [product?.imageUrl]); 

  const handleNavigate = () => {
    const categoryName = product?.category?.name?.toLowerCase() || "category";
    navigate(`/product/${product?._id || "some-product-id"}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden w-full max-w-xs mx-auto sm:mx-3 my-4"
    >
      <div className="relative h-[12rem] sm:h-[13rem] md:h-[14rem] w-full">
        {product?.imageUrl && product.imageUrl.length > 0 ? (
          <img
            className="object-cover object-top w-full h-full hover:scale-105 transition-transform duration-300"
            src={product.imageUrl[currentImageIndex]}
            alt={product?.title || "Product Image"}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      <div className="p-4 w-full">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
          {product?.brand || product?.title || "Unknown Product"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product?.title || "No description available."}
        </p>

        <div className="mt-3 flex justify-between items-center">
          {product?.price && (
            <p className="line-through text-gray-400">₹{product.price}</p>
          )}
          {product?.discountedPrice && (
            <span className="text-lg font-bold text-indigo-600">
              ₹{product.discountedPrice}
            </span>
          )}
          {product?.discountPersent && (
            <span className="text-sm font-medium text-green-600">
              {product.discountPersent}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;