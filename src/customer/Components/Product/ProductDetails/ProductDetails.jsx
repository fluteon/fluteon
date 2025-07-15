import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Backdrop, Box, Button, CircularProgress, Grid, LinearProgress, Rating } from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews, getRatingSummary, } from "../../../../Redux/Customers/Review/Action";
import { FormHelperText } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import { IconButton, Tooltip } from '@mui/material';

import { Helmet } from 'react-helmet';




const product = {
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "XXL", inStock: true },
  ],
 
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [sizeChart, setSizeChart] = useState([]);

  const baseUrl = process.env.REACT_APP_API_BASE_URL
  const [selectedSize, setSelectedSize] = useState();
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const { customersProduct, review } = useSelector((store) => store);
console.log("customer product ...", customersProduct)
const ratingSummaryData = review?.reviews?.ratingSummary || {
  totalRatings: 0,
  averageRating: 0,
  counts: {}
};
 // ✅ this works now


// const { ratingSummary: ratingSummaryData } = useSelector((state) => state.ratingSummaryState);

  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [sizeError, setSizeError] = useState(false);
const [showAll, setShowAll] = useState(false);
const summary = review.ratingSummary || {};
const reviewsToShow = Array.isArray(review?.reviews?.reviews)
  ? showAll
    ? review.reviews.reviews
    : review.reviews.reviews.slice(0, 5)
  : [];

<Helmet>
  <title>{product?.title} | Fluteon</title>
  <meta property="og:title" content={product?.title} />
  <meta property="og:description" content={`Buy ${product?.title} at Fluteon`} />
  <meta property="og:image" content={product?.imageUrl?.[0]} />
  <meta property="og:url" content={`https://www.fluteon.com/product/${product?._id}`} />
  <meta property="og:type" content="product" />
</Helmet>

useEffect(() => {
  if (customersProduct?.product?.imageUrl?.length > 0) {
    setActiveImage(customersProduct.product.imageUrl[0]);
    setIsLoading(false); // ✅ Hide loader after images are ready
  }
}, [customersProduct]);


  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };


const handleSubmit = (e) => {
  e.preventDefault();

  if (!selectedSize) {
    setSizeError(true);
    return;
  }

  setSizeError(false);
  const data = { productId, size: selectedSize.name };
  dispatch(addItemToCart({ data, jwt }));
  navigate("/cart");
};


  useEffect(() => {
    const data = { productId: productId, jwt };
    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
    dispatch(getRatingSummary(productId));
  }, [productId]);

  useEffect(() => {
  const fetchSizeChart = async () => {
    if (customersProduct?.product?.category?.name) {
      try {
        const res = await fetch(`${baseUrl}/api/admin/products/${customersProduct.product.category.name}`);
        const data = await res.json();
        setSizeChart(data.sizes || []);
      } catch (error) {
        console.error("Error fetching size chart:", error);
      }
    }
  };

  fetchSizeChart();
}, [customersProduct?.product?.category?.name]);

if (isLoading) {
  return (
    <Backdrop
      open
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: "#fff",
      }}
    >
      <CircularProgress color="inherit" />
      <span className="ml-3 text-white text-lg font-medium">
        Loading Product...
      </span>
    </Backdrop>
  );
}

// console.log("reviews....:", review.reviews);
// console.log("ratingSummaryData:", ratingSummaryData);
const handleShare = async () => {
  const shareData = {
    title: customersProduct.product?.title || 'Product',
    text: 'Check out this product on Fluteon!',
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  } catch (error) {
    console.error("Sharing failed", error);
  }
};


  return (
    
<div className="bg-white">
  {/* Floating Share Button */}
<Tooltip title="Share Product" arrow>
  <IconButton
    onClick={handleShare}
    sx={{
      position: 'fixed',
      top: '50%',
      right: '20px',
      zIndex: 1000,
      backgroundColor: '#fff',
      boxShadow: 3,
      border: '1px solid #ccc',
      '&:hover': {
        backgroundColor: '#f1f1f1',
      },
      display: {
        xs: 'none', // ❌ hidden on mobile
        sm: 'none', // ❌ hidden on small screens
        md: 'flex', // ✅ visible on medium and up
      },
    }}
  >
    <ShareIcon color="action" />
  </IconButton>
</Tooltip>



  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 ">
    {/* Product Details */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-10">
      {/* Image Gallery */}
      <div className="flex flex-col items-center relative">
        {/* Main Image */}
        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
          <img
            src={activeImage || customersProduct?.product?.imageUrl?.[0]}
            alt="Main product"
            className="w-full h-full object-cover object-center"
          />
          <Tooltip title="Share Product" arrow>
  <IconButton
    onClick={handleShare}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 10,
              backgroundColor: "white",
              padding: "6px",
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "#f3f3f3",
              },
            }}
  >
    <ShareIcon fontSize="small" />
  </IconButton>
</Tooltip>

        </div>

        {/* Thumbnails */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {customersProduct?.product?.imageUrl?.map((image, idx) => (
            <div
              key={image + idx}
              onClick={() => handleSetActiveImage(image)}
              className={`overflow-hidden rounded-lg w-20 h-20 cursor-pointer border 
                ${activeImage === image ? "ring-2 ring-blue-500" : ""}`}
            >
              <img
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="lg:col-span-1 space-y-2">
        {/* Title & Brand */}
        <div>
          <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900">
            {customersProduct.product?.brand}
          </h1>
          <h2 className="text-lg lg:text-xl tracking-tight text-gray-600 pt-1">
            {customersProduct.product?.title}
          </h2>
        </div>

        {/* Price Block */}
        <div className="flex flex-wrap items-center gap-4 text-lg lg:text-xl">
          <p className="font-semibold text-gray-900">
            ₹{customersProduct.product?.discountedPrice}
          </p>
          <p className="line-through text-gray-400">
            ₹{customersProduct.product?.price}
          </p>
          <p className="text-green-600 font-semibold">
            {customersProduct.product?.discountPersent}% Off
          </p>
        </div>

        {/* Size Chart */}
        {sizeChart.length > 0 && (
          <div className="">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Size Chart</h4>
            <div className="overflow-x-auto border rounded-md">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-2">Size</th>
                    {sizeChart[0]?.bust && <th className="px-4 py-2">Bust</th>}
                    {sizeChart[0]?.waist && <th className="px-4 py-2">Waist</th>}
                    {sizeChart[0]?.hips && <th className="px-4 py-2">Hips</th>}
                    {sizeChart[0]?.length && <th className="px-4 py-2">Length</th>}
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((s, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-4 py-2">{s.label}</td>
                      {s.bust && <td className="px-4 py-2">{s.bust}</td>}
                      {s.waist && <td className="px-4 py-2">{s.waist}</td>}
                      {s.hips && <td className="px-4 py-2">{s.hips}</td>}
                      {s.length && <td className="px-4 py-2">{s.length}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Size Selector + Add to Cart */}
        <form className="pt-4" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Choose Size:</h3>
<RadioGroup
  value={selectedSize}
  onChange={setSelectedSize}
  className="mt-4"
>
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
    {customersProduct.product?.sizes?.map((size) => {
      const outOfStock = size.quantity === 0;

      return (
        <RadioGroup.Option
          key={size.name}
          value={size}
          disabled={outOfStock}
          className={({ active, checked }) =>
            classNames(
              outOfStock
                ? "cursor-not-allowed bg-gray-100 text-gray-400 line-through"
                : "cursor-pointer bg-white text-gray-900 shadow-sm hover:bg-gray-50",
              active ? "ring-2 ring-indigo-500" : "",
              checked ? "border-indigo-500" : "border-gray-300",
              "relative flex items-center justify-center border rounded-md py-2 px-4 text-sm font-medium uppercase transition-all duration-200"
            )
          }
        >
          {({ checked }) => (
            <>
              <RadioGroup.Label as="span">
                {size.name} {outOfStock}
              </RadioGroup.Label>
              {checked && !outOfStock && (
                <span
                  className="absolute -inset-px rounded-md ring-2 ring-indigo-500 pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </RadioGroup.Option>
      );
    })}
  </div>
</RadioGroup>

            {sizeError && (
              <FormHelperText error sx={{ marginTop: 1 }}>
                Please select a size before adding to cart.
              </FormHelperText>
            )}
          </div>

          <Button
            variant="contained"
            type="submit"
            sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
          >
            Add To Cart
          </Button>
        </form>

        {/* Product Description */}
        <div>
          <h3 className="pt-5 text-md font-medium text-gray-900">Description:</h3>
          <p className="text-base text-gray-800">
            {customersProduct.product?.description}
          </p>
        </div>
      </div>
    </section>

    {/* Ratings & Reviews */}
<section className="pt-10">
  <h1 className="font-semibold text-lg pb-4">Recent Review & Ratings</h1>

  <div className="border rounded-lg p-5">
    <Grid container spacing={5}>
      {/* Review Cards */}
      <Grid item xs={12} md={7}>
        <div className="space-y-5">
          {reviewsToShow.length > 0 ? (
            reviewsToShow.map((item, i) => (
              <ProductReviewCard item={item} key={i} />
            ))
          ) : (
            <p className="text-gray-500">No reviews available.</p>
          )}

{Array.isArray(review.reviews?.reviews) && review.reviews.reviews.length > 5 && (
            <div className="pt-4 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-indigo-600 font-medium text-sm hover:underline"
              >
                {showAll ? "Show Less Reviews" : "Show More Reviews"}
              </button>
            </div>
          )}
        </div>
      </Grid>

      {/* Rating Summary */}
      <Grid item xs={12} md={5}>
        <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
{!ratingSummaryData ? (
  <div className="flex items-center space-x-3 pb-6">
    <CircularProgress size={24} color="inherit" />
    <p className="text-sm text-gray-400">Loading rating summary...</p>
  </div>
) : ratingSummaryData.totalRatings === 0 ? (
  <p className="text-sm text-gray-400">No ratings yet.</p>
) : (
  <>
    <div className="flex items-center space-x-3 pb-6">
      <Rating
        name="read-only"
        value={ratingSummaryData.averageRating || 0}
        precision={0.5}
        readOnly
      />
      <p className="text-sm text-gray-500">
        {ratingSummaryData.totalRatings} Ratings
      </p>
    </div>

    {[
  { label: "Excellent", rating: 5, color: "#4caf50" },  // Green
  { label: "Very Good", rating: 4, color: "#8bc34a" },  // Light Green
  { label: "Good", rating: 3, color: "#ffc107" },       // Amber
  { label: "Average", rating: 2, color: "#ff9800" },    // Orange
  { label: "Poor", rating: 1, color: "#f44336" } 
    ].map((bar, index) => {
      const count = ratingSummaryData.counts?.[bar.rating] || 0;
      const percentage = ratingSummaryData.totalRatings
        ? (count / ratingSummaryData.totalRatings) * 100
        : 0;

return (
  <Box key={index} mb={2}>
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={4} sm={3}>
        <p className="text-sm">{bar.label}</p>
      </Grid>
      <Grid item xs={6} sm={7}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            bgcolor: "#e0e0e0",
            borderRadius: 4,
            height: 7,
            "& .MuiLinearProgress-bar": {
              backgroundColor: bar.color,
            },
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <p className="text-sm text-gray-400">{count}</p>
      </Grid>
    </Grid>
  </Box>
);

    })}
  </>
)}





      </Grid>
    </Grid>
  </div>
</section>

  </div>
</div>

  );
}


