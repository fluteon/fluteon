import React, { useState, lazy, Suspense } from "react";
import AliceCarousel from "react-alice-carousel";
import { Button, useMediaQuery } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./HomeProductSection.css";

const HomeProductCard = lazy(() => import("./HomeProductCard"));

const HomeProductSection = ({ section, data = [] }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const arrowSize = isMobile ? 36 : 50;

  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const slideNext = () =>
    setActiveIndex((prev) =>
      Math.min(prev + 1, data.length - visibleItems())
    );
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: { items: 2 },
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
    <div key={i} className="px-[2px] mx-1">
      <Suspense fallback={<div style={{ height: "300px" }}>Loading...</div>}>
        <HomeProductCard product={item} />
      </Suspense>
    </div>
  ));

  if (!data || data.length === 0) {
    return (
      <section aria-label={`${section} section`} className="px-4 sm:px-6 lg:px-8 py-5">
        <header>
          <h2 className="text-2xl font-extrabold text-gray-900 py-1">{section}</h2>
        </header>
        <p className="text-gray-500">No products available at this time.</p>
      </section>
    );
  }

  return (
    <section aria-label={`${section} section`} className="relative">
      <header>
        <h2 className="text-2xl font-extrabold text-gray-900 px-2 py-5">{section}</h2>
      </header>
      <div className="relative">
        <AliceCarousel
          disableButtonsControls
          disableDotsControls
          mouseTracking
          items={items}
          activeIndex={activeIndex}
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          animationType="fadeout"
          animationDuration={600}
        />

        {activeIndex < items.length - visibleItems() && (
          <CarouselArrow
            onClick={slideNext}
            position="right"
            isMobile={isMobile}
            arrowSize={arrowSize}
          />
        )}

        {activeIndex > 0 && (
          <CarouselArrow
            onClick={slidePrev}
            position="left"
            isMobile={isMobile}
            arrowSize={arrowSize}
          />
        )}
      </div>
    </section>
  );
};

const CarouselArrow = ({ onClick, position, isMobile, arrowSize }) => (
  <Button
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      [position]: "0rem",
      transform:
        position === "left"
          ? "translateY(-50%) rotate(180deg)"
          : "translateY(-50%)",
      minWidth: 0,
      borderRadius: "50%",
      boxShadow: 5,
      bgcolor: "white",
      height: `${arrowSize}px`,
      width: `${arrowSize}px`,
      zIndex: 50,
    }}
    aria-label={`${position === "left" ? "Previous" : "Next"} products`}
  >
    <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
  </Button>
);

export default HomeProductSection;
