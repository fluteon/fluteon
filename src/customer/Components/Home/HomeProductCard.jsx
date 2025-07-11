
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
      const initialDelay = Math.floor(Math.random() * 1000); // 0 to 999 ms

      const startInterval = () => {
        interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % product.imageUrl.length
          );
        }, 1000); // rotate every second
      };

      const timeout = setTimeout(startInterval, initialDelay); // start after a small random delay

      return () => {
        clearTimeout(timeout);
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [product?.imageUrl]);

  const handleNavigate = () => {
    // const categoryName = product?.category?.name?.toLowerCase() || "category"; // Not used currently, but good to keep if needed
    navigate(`/product/${product?._id || "some-product-id"}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden w-full max-w-xs mx-auto "
    >
      <div className="relative w-full h-56 overflow-hidden rounded-t-lg"> {/* Increased height for image */}
        {product?.imageUrl && product.imageUrl.length > 0 ? (
          <img
            className="object-cover object-top w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
            src={product.imageUrl[currentImageIndex]}
            alt={product?.title || "Product Image"}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image Available
          </div>
        )}
        {product?.discountPersent && product.discountPersent > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            {product.discountPersent}% OFF
          </span>
        )}
      </div>

      <div className="p-4 w-full flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1 truncate"> {/* Larger, bolder brand/title */}
            {product?.brand || "Product"}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product?.title || "No description available."}
          </p>
        </div>

        <div className="flex items-baseline mt-auto"> {/* Aligned price info at the bottom */}
          {product?.price && (
            <p className="line-through text-gray-400 text-sm mr-2">
              ₹{product.price}
            </p>
          )}
          {product?.discountedPrice && (
            <span className="text-2xl font-extrabold text-indigo-700"> {/* More prominent discounted price */}
              ₹{product.discountedPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;