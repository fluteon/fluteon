// import AliceCarousel from "react-alice-carousel";
// import HomeProductCard from "./HomeProductCard";
// import "./HomeProductSection.css";
// import { Button } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { findProducts } from "../../../Redux/Customers/Product/Action";

// const HomeProductSection = ({ section, data=[] }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const slidePrev = () => setActiveIndex(activeIndex - 1);
//   const slideNext = () => setActiveIndex(activeIndex + 1);
//   const syncActiveIndex = ({ item }) => setActiveIndex(item);
//   const dispatch = useDispatch()
// const { customersProduct } = useSelector((store) => store);
// const products = customersProduct?.content || [];

//   const responsive = {
//     0: {
//       items: 1,
//       itemsFit: "contain",
//     },
//     568: {
//       items: 2,
//       itemsFit: "contain",
//     },
//     1024: {
//       items: 5.5,
//       itemsFit: "contain",
//     },
//   };
//   const items = data?.slice(0, 10).map((item) => (
//     <div className="">
//       {" "}
//       <HomeProductCard product={item} />
//     </div>
//   ));

//   // const slideInFromRight = (t) => {
//   //   return `translateX(${100 - t * 100}%)`;
//   // };

//   if(!data || data.length===0){
//     return(
//       <div className="px-4 sm:px-6 lg:px-8 py-10">
//         <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
//         <p className="text-gray-500">No products available this time</p>
//       </div>
//     )
//   }

//   return (
//     <div className="relative px-4 sm:px-6 lg:px-8 ">
//       <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
//       <div className="relative border p-5">
//         <AliceCarousel
//           disableButtonsControls
//           disableDotsControls
//           mouseTracking
//           items={items}
//           activeIndex={activeIndex}
//           responsive={responsive}
//           onSlideChanged={syncActiveIndex}
//           animationType="fadeout"
//           animationDuration={2000}
//         />
//         {activeIndex !== items.length - 5 && (
//           <Button
//             onClick={slideNext}
//             variant="contained"
//             className="z-50 bg-[]"
//             sx={{
//               position: "absolute",
//               top: "8rem",
//               right: "0rem",
//               transform: "translateX(50%) rotate(90deg)",
//             }}
//             color="white"
//             aria-label="next"
//           >
//             <ArrowForwardIosIcon
//               className=""
//               sx={{ transform: "rotate(-90deg)" }}
//             />
//           </Button>
//         )}

//         {activeIndex !== 0 && (
//           <Button
//             onClick={slidePrev}
//             variant="contained"
//             className="z-50 bg-[]"
//             color="white"
//             sx={{
//               position: "absolute",
//               top: "8rem",
//               left: "0rem",
//               transform: "translateX(-50%)  rotate(90deg)",
//             }}
//             aria-label="next"
//           >
//             <ArrowForwardIosIcon
//               className=""
//               sx={{ transform: " rotate(90deg)" }}
//             />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeProductSection;


// import AliceCarousel from "react-alice-carousel";
// import HomeProductCard from "./HomeProductCard";
// import "./HomeProductSection.css";
// import { Button } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { findProducts } from "../../../Redux/Customers/Product/Action";

// const HomeProductSection = ({ section, data = [] }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const dispatch = useDispatch();
//   const { customersProduct } = useSelector((store) => store);
//   console.log("customers......",customersProduct)
//   const products = customersProduct?.products?.content || [];

//   console.log("products...",products)

//   const slidePrev = () => setActiveIndex(activeIndex - 1);
//   const slideNext = () => setActiveIndex(activeIndex + 1);
//   const syncActiveIndex = ({ item }) => setActiveIndex(item);

//   const responsive = {
//     0: { items: 1, itemsFit: "contain" },
//     480: { items: 2, itemsFit: "contain" },
//     768: { items: 3, itemsFit: "contain" },
//     1024: { items: 4, itemsFit: "contain" },
//     1280: { items: 5, itemsFit: "contain" },
//   };
  
// useEffect(() => {
//   dispatch(findProducts({})); // 👈 pass at least an empty object
// }, [dispatch]);


//   const items = data?.slice(0, 10).map((item, i) => (
//     <div key={i} className="px-2"> {/* spacing between items */}
//       <HomeProductCard product={item} />
//     </div>
//   ));





//   if (!data || data.length === 0) {
//     return (
//       <div className="px-4 sm:px-6 lg:px-8 py-10">
//         <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
//         <p className="text-gray-500">No products available this time</p>
//       </div>
//     );
//   }
 


//   return (
//     <div className="relative px-4 sm:px-6 lg:px-8">
//       <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>

//       <div className="relative border p-5">
//         <AliceCarousel
//           disableButtonsControls
//           disableDotsControls
//           mouseTracking
//           items={items}
//           activeIndex={activeIndex}
//           responsive={responsive}
//           onSlideChanged={syncActiveIndex}
//           animationType="fadeout"
//           animationDuration={2000}
//         />

//         {activeIndex < items.length - 5 && (
//           <Button
//             onClick={slideNext}
//             className="z-50"
//             sx={{
//               position: "absolute",
//               top: "50%",
//               right: "-1.5rem",
//               transform: "translateY(-70%)",
//               minWidth: "0",
//               borderRadius: "50%",
//               boxShadow: 5,
//               bgcolor:"white",
//               height:"50px",
//               width:"50px"
//             }}
//             aria-label="next"
//           >
//             <ArrowForwardIosIcon />
//           </Button>
//         )}

//         {activeIndex > 0 && (
//           <Button
//             onClick={slidePrev}
//             // variant="contained"
//             className="z-50"
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "-1.5rem",
//               transform: "translateY(-50%) rotate(180deg)",
//               minWidth: "0",
//               borderRadius: "50%",
//               boxShadow: 5,
//               height:"50px",
//               width:"50px"
//             }}
//             aria-label="prev"
//           >
//             <ArrowForwardIosIcon />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeProductSection;


import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import "./HomeProductSection.css";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

const HomeProductSection = ({ section, data = [] }) => {

  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: { items: 1 },
    480: { items: 2 },
    768: { items: 3 },
    1024: { items: 4 },
    1280: { items: 5 },
  };

  const items = data?.slice(0, 10).map((item, i) => (
    <div key={i} className="px-2">
      <HomeProductCard product={item} />
    </div>
  ));

  if (!data || data.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
        <p className="text-gray-500">No products available at this time.</p>
      </div>
    );
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>

      <div className="relative border p-5">
        <AliceCarousel
          disableButtonsControls
          disableDotsControls
          mouseTracking
          items={items}
          activeIndex={activeIndex}
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          animationType="fadeout"
          animationDuration={2000}
        />

        {activeIndex < items.length - 5 && (
          <Button
            onClick={slideNext}
            className="z-50"
            sx={{
              position: "absolute",
              top: "50%",
              right: "-1.5rem",
              transform: "translateY(-70%)",
              minWidth: "0",
              borderRadius: "50%",
              boxShadow: 5,
              bgcolor: "white",
              height: "50px",
              width: "50px",
            }}
            aria-label="next"
          >
            <ArrowForwardIosIcon />
          </Button>
        )}

        {activeIndex > 0 && (
          <Button
            onClick={slidePrev}
            className="z-50"
            sx={{
              position: "absolute",
              top: "50%",
              left: "-1.5rem",
              transform: "translateY(-50%) rotate(180deg)",
              minWidth: "0",
              borderRadius: "50%",
              boxShadow: 5,
              height: "50px",
              width: "50px",
            }}
            aria-label="prev"
          >
            <ArrowForwardIosIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeProductSection;
