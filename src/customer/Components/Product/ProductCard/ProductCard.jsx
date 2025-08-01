// import React from 'react';
// import "./ProductCard.css";
// import{useLocation, useNavigate} from "react-router-dom";

// const ProductCard = ({ product }) => {
//   const { title, brand, imageUrl, price ,discountedPrice,color,discountPersent} = product;
//   const navigate= useNavigate();
  

//   const handleNavigate=()=>{
//     navigate(`/product/${product?._id}`)
//   }

//   return (
//    <div onClick={handleNavigate} className='productCard w-[15rem] border m-3 transition-all cursor-pointer '>
//     <div className='h-[20rem]'>
//         <img className='h-full w-full object-cover object-left-top' src={imageUrl} alt="" />
//     </div>
//     <div className='textPart bg-white p-3 '>
//         <div>
//         <p  className='font-bold opacity-60'>{brand}</p>
//             <p className=''>{title}</p>
        
//         <p className='font-semibold opacity-50'>{color}</p>
//         </div>
        
//         <div className='flex space-x-2 items-center'>
//             <p className='font-semibold'>₹{discountedPrice}</p>
//             <p className='opacity-50 line-through'>₹{price}</p>
//             <p className='text-green-600 font-semibold'>{discountPersent}% off</p>
//         </div>
        
//     </div>
//    </div>
//   );
// };

// export default ProductCard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { title, brand, imageUrl, price, discountedPrice, color, discountPersent } = product;

  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (imageUrl && imageUrl.length > 1) {
      const initialDelay = Math.floor(Math.random() * 1000);

      const startInterval = () => {
        interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrl.length);
        }, 1000);
      };

      const timeout = setTimeout(startInterval, initialDelay);

      return () => {
        clearTimeout(timeout);
        if (interval) clearInterval(interval);
      };
    }
  }, [imageUrl]);

  const handleNavigate = () => {
    navigate(`/product/${product?._id}`);
  };

  const handleShare = async (e) => {
    e.stopPropagation(); // prevent navigation on share click

    const shareUrl = `${window.location.origin}/product/${product?._id}`;
    const shareData = {
      title: product?.title || "Fluteon Product",
      text: product?.brand || "Check out this product!",
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Sharing failed", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col items-center bg-white border border-gray-100 rounded-lg transition duration-300 transform hover:-translate-y-1 overflow-hidden w-full max-w-xs mx-auto relative"
    >
      <div className="relative w-full h-56 overflow-hidden">
        {imageUrl && imageUrl.length > 0 ? (
          <img
            className="object-cover object-top w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
            src={imageUrl[currentImageIndex]}
            loading="lazy"
            alt={`${brand || "Product"} - ${title || "Fluteon Item"}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image Available
          </div>
        )}

        {discountPersent > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
            {discountPersent}% OFF
          </span>
        )}

        <Tooltip title="Share" arrow>
          <IconButton
            onClick={handleShare}
            aria-label="Share product"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 10,
              backgroundColor: "white",
              padding: "4px",
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "#f3f3f3",
              },
            }}
            size="small"
          >
            <ShareIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>

      <div className="p-4 w-full flex flex-col justify-between flex-grow">
        <div>
          <h3
            className="text-xl font-bold text-gray-800 mb-1 truncate"
            title={brand || "Brand"}
          >
            {brand || "Brand"}
          </h3>
          <p
            className="text-sm text-gray-600 mb-2 line-clamp-2"
            title={title || "Product Title"}
          >
            {title || "Product Title"}
          </p>
          {color && <p className="text-xs text-gray-400">{color}</p>}
        </div>

        <div className="flex items-baseline mt-auto">
          {price && (
            <p className="line-through text-gray-400 text-sm mr-2">₹{price}</p>
          )}
          {discountedPrice && (
            <span className="text-2xl font-extrabold text-indigo-700">₹{discountedPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
