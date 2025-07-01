import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";
import "./Carousel.css"; // 🔥 You'll create this CSS file

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const navigate = useNavigate();

  const items = homeCarouselData.map((item) => (
    <div
      key={item.path}
      className=""
      onClick={() => navigate(item.path)}
    >
      <img
        className="w-full h-[60vh] sm:h-[50vh] xs:h-[40vh] flex justify-center items-center"
        onDragStart={handleDragStart}
        src={item.image}
        alt=""
        role="presentation"
      />
    </div>
  ));

  return (
    <div className="relative">
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay
        infinite
        autoPlayInterval={2000}
        disableButtonsControls
        disableDotsControls={false}
      />
    </div>
  );
};

export default HomeCarousel;
