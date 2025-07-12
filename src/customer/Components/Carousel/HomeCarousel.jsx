
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";
import { Button, useMediaQuery } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import "./Carousel.css"; // 🔥 Contains custom CSS for spacing, etc.

const HomeCarousel = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const arrowSize = isMobile ? 32 : 42;

  const items = homeCarouselData.map((item) => (
    <div
      key={item.id}
      onClick={() => navigate(item.path)}
      className="carousel-item"
    >
      <div className="circle-wrapper">
        <img
          src={item.image}
          alt={item.title}
          className="circle-image"
        />
      </div>
      <span className="carousel-title">{item.title}</span>
    </div>
  ));

  return (
    <div className="carousel-container">
      <AliceCarousel
        items={items}
        responsive={{
          0: { items: 3 },
          512: { items: 5 },
          768: { items: 6 },
          1024: { items: 7 },
        }}
        disableDotsControls
        mouseTracking
        autoPlay={false}
        controlsStrategy="responsive"
        renderPrevButton={() => (
          <Button
            sx={{
              position: "absolute",
              top: "32%",
              left: "-10px",
              transform: "translateY(-50%)",
              minWidth: 0,
              borderRadius: "50%",
              boxShadow: 5,
              bgcolor: "white",
              height: `${arrowSize}px`,
              width: `${arrowSize}px`,
              zIndex: 50,
            }}
            aria-label="previous"
          >
            <ArrowBackIosNewIcon fontSize={isMobile ? "small" : "medium"} />
          </Button>
        )}
        renderNextButton={() => (
          <Button
            sx={{
              position: "absolute",
              top: "32%",
              right: "-10px",
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
      />
    </div>
  );
};

export default HomeCarousel;
