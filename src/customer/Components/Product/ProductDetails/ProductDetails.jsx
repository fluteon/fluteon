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
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import { FormHelperText } from "@mui/material";


const product = {
  sizes: [
    { name: "28", inStock: true },
    { name: "30", inStock: true },
    { name: "32", inStock: true },
    { name: "34", inStock: true },
    { name: "36", inStock: true },
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
  const { customersProduct,review } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [sizeError, setSizeError] = useState(false);


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


  return (
    <div className="bg-white lg:px-20">
      <div className="">
        {/* product details */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 ">
          {/* Image gallery */}
<div className="flex flex-col items-center">
  {/* Main Image */}
  <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
    <img
      src={activeImage ? activeImage : customersProduct?.product?.imageUrl?.[0]}
      alt="Main product"
      className="h-full w-full object-cover object-center"
    />
  </div>

  {/* Thumbnails */}
  <div className="flex flex-wrap space-x-5 justify-center">
    {customersProduct?.product?.imageUrl?.map((image, idx) => (
      <div
        key={image + idx}
        onClick={() => handleSetActiveImage(image)}
        className={`aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4 cursor-pointer 
          ${activeImage === image ? "ring-2 ring-blue-500" : ""}`}
      >
        <img
          src={image}
          alt={`Thumbnail ${idx + 1}`}
          className="h-full w-full object-cover object-center"
        />
      </div>
    ))}
  </div>
</div>


          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-2 pb-8 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900  ">
                {customersProduct.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                {customersProduct.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                <p className="font-semibold">
                  ₹{customersProduct.product?.discountedPrice}
                </p>
                <p className="opacity-50 line-through">
                  ₹{customersProduct.product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {customersProduct.product?.discountPersent}% Off
                </p>
              </div>

              {/* Reviews */}
              {/* <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>

                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={4.6}
                    precision={0.5}
                    readOnly
                  />

                  <p className="opacity-60 text-sm">42807 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div> */}

{sizeChart.length > 0 && (
  <div className="mt-4">
    <h4 className="text-md font-semibold mb-2 text-gray-700">Size Chart</h4>
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
          {sizeChart.map((s, index) => (
            <tr key={index} className="border-b">
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



              <form className="mt-4" onSubmit={handleSubmit}>
                {/* Sizes */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Choose Size : </h3>
                  </div>

<RadioGroup
  value={selectedSize}
  onChange={setSelectedSize}
  className="mt-4"
>
  <RadioGroup.Label className="sr-only">
    Choose a size
  </RadioGroup.Label>

  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 w-full">
    {product.sizes.map((size) => (
      <RadioGroup.Option
        key={size.name}
        value={size}
        disabled={!size.inStock}
        className={({ active, checked }) =>
          classNames(
            size.inStock
              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
              : "cursor-not-allowed bg-gray-50 text-gray-200",
            active ? "ring-2 ring-indigo-500" : "",
            checked ? "border-indigo-500" : "border-gray-300",
            "group relative flex items-center justify-center border rounded-md py-2 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none transition-all duration-200"
          )
        }
      >
        {({ checked }) => (
          <>
            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
            {checked && (
              <span
                className="absolute -inset-px rounded-md ring-2 ring-indigo-500 pointer-events-none"
                aria-hidden="true"
              />
            )}
          </>
        )}
      </RadioGroup.Option>
    ))}
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
            </div>

    <div className="">
        <h3 className=" pt-5">Description : </h3>
                  <p className="text-base text-gray-900">
                    {customersProduct.product?.description}
                  </p>
                </div>
          </div>
        </section>
        {/* rating and review section */}
        <section className="">
  <h1 className="font-semibold text-lg pb-4 pt-8">
    Recent Review & Ratings
  </h1>

  <div className="border p-5">
    <Grid container spacing={5}>
      {/* Review Section */}
      <Grid item xs={12} md={7}>
        <div className="space-y-5">
          {review.reviews?.map((item, i) => (
            <ProductReviewCard item={item} key={i} />
          ))}
        </div>
      </Grid>

      {/* Rating Summary */}
      <Grid item xs={12} md={5}>
        <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
        <div className="flex items-center space-x-3 pb-10">
          <Rating name="read-only" value={4.6} precision={0.5} readOnly />
          <p className="opacity-60">42807 Ratings</p>
        </div>

        {/* Rating Bars */}
        {[
          { label: "Excellent", value: 40, color: "success" },
          { label: "Very Good", value: 30, color: "success" },
          { label: "Good", value: 25, color: "orange" },
          {
            label: "Average",
            value: 21,
            color: "#885c0a", // custom color using sx
          },
          { label: "Poor", value: 10, color: "error" },
        ].map((bar, index) => (
          <Box key={index} mb={2}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={3}>
                <p className="p-0">{bar.label}</p>
              </Grid>
              <Grid item xs={6} sm={7}>
                <LinearProgress
                  variant="determinate"
                  value={bar.value}
                  sx={{
                    bgcolor: "#d0d0d0",
                    borderRadius: 4,
                    height: 7,
                    "& .MuiLinearProgress-bar": {
                      bgcolor: bar.color === "orange" ? "#ff9800" : bar.color,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <p className="opacity-50 text-sm">19259</p>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Grid>
    </Grid>
  </div>
</section>
      </div>
    </div>
  );
}


