import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {

  console.log("products....",product)
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_BASE_URL
  const handleNavigate = () => {
    const categoryName = product?.category?.name?.toLowerCase() || "category";
    navigate(`/women/clothing/${categoryName}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className=" cursor-pointer flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden w-full max-w-xs mx-auto sm:mx-3 my-4"
    >
      <div className="h-[12rem] sm:h-[13rem] md:h-[14rem]">
        <img
          className="object-cover object-top w-full h-full hover:scale-105 transition-transform duration-300"
          src={product?.imageUrl?.[0]}
          alt={product?.title}
        />
      </div>

      <div className="p-4 w-full">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
          {product?.brand || product?.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product?.title}</p>

        <div className="mt-3 flex justify-between items-center">
           <p className="line-through text-gray-400">
            ₹{product?.price}
          </p>
          <span className="text-lg font-bold text-indigo-600">
            ₹{product?.discountedPrice }
          </span>
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

