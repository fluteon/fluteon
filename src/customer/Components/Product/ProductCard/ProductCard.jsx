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

import React from 'react';
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const ProductCard = ({ product }) => {
  console.log ("product",product) 
  const { title, brand, imageUrl , price, discountedPrice, color, discountPersent } = product;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${product?._id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="border border-gray-200 cursor-pointer flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden w-full max-w-xs mx-auto sm:mx-3 my-4"
    >
      <div className="h-[12rem] sm:h-[13rem] md:h-[14rem]">
        <img
          className="object-cover object-top w-full h-full hover:scale-105 transition-transform duration-300"
          src={product?.imageUrl?.[0]} alt={product?.title}
         
        />
      </div>

      <div className="p-2 space-y-1">
        <div>
          <p className="text-xs font-semibold text-gray-500">{brand}</p>
          <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
          <p className="text-xs text-gray-400">{color}</p>
        </div>

        <div className="flex items-center space-x-1">
          <p className="text-sm font-semibold text-gray-900">₹{discountedPrice}</p>
          <p className="text-xs line-through text-gray-400">₹{price}</p>
          <p className="text-xs text-green-600 font-medium">{discountPersent}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

