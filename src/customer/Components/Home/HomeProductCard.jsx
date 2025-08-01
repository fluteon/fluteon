import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    _id,
    title = "Product Title",
    brand = "Brand",
    imageUrl = [],
    price,
    discountedPrice,
    color,
    discountPersent,
  } = product;

  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (imageUrl.length > 1) {
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
    navigate(`/product/${_id}`);
  };

  return (
    <article
      onClick={handleNavigate}
      aria-label={`${brand} - ${title}`}
      className="cursor-pointer flex flex-col items-center bg-white border border-gray-100 rounded-lg transition duration-300 transform hover:-translate-y-1 overflow-hidden w-full max-w-xs mx-auto"
    >
      <div className="relative w-full h-56 overflow-hidden">
        {imageUrl.length > 0 ? (
          <img
            className="object-cover object-top w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
            src={imageUrl[currentImageIndex]}
            alt={title}
            loading="lazy"
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
      </div>

      <div className="p-4 w-full flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">{brand}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{title}</p>
          {color && <p className="text-xs text-gray-400">{color}</p>}
        </div>

        <div className="flex items-baseline mt-auto">
          {price && <p className="line-through text-gray-400 text-sm mr-2">₹{price}</p>}
          {discountedPrice && (
            <span className="text-2xl font-extrabold text-indigo-700">₹{discountedPrice}</span>
          )}
        </div>
      </div>

      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: title,
          image: imageUrl[0],
          description: title,
          sku: _id,
          brand: {
            "@type": "Brand",
            name: brand
          },
          offers: {
            "@type": "Offer",
            url: `${window.location.origin}/product/${_id}`,
            priceCurrency: "INR",
            price: discountedPrice || price,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition"
          }
        })
      }} />
    </article>
  );
};

export default ProductCard;
