
import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import "./HomeProductSection.css";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";


const HomeProductSection = ({ section, data = [] }) => {
const isMobile = useMediaQuery("(max-width: 640px)");
const arrowSize = isMobile ? 36 : 50;

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

  const visibleItems = () => {
  if (window.innerWidth >= 1280) return 5;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 768) return 3;
  if (window.innerWidth >= 480) return 2;
  return 1;
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

{activeIndex < items.length - visibleItems() && (
  <Button
    onClick={slideNext}
    sx={{
      position: "absolute",
      top: "50%",
      right: "0.5rem",
      transform: "translateY(-50%)",
      minWidth: 0,
      borderRadius: "50%",
      boxShadow: 5,
      bgcolor: "white",
      height: `${arrowSize}px`,
      width: `${arrowSize}px`,
      zIndex: 50,
    }}
    aria-label="next"
  >
    <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
  </Button>
)}

{activeIndex > 0 && (
  <Button
    onClick={slidePrev}
    sx={{
      position: "absolute",
      top: "50%",
      left: "0.5rem",
      transform: "translateY(-50%) rotate(180deg)",
      minWidth: 0,
      borderRadius: "50%",
      boxShadow: 5,
      bgcolor: "white",
      height: `${arrowSize}px`,
      width: `${arrowSize}px`,
      zIndex: 50,
    }}
    aria-label="prev"
  >
    <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
  </Button>
)}


      </div>
    </div>
  );
};

export default HomeProductSection;
