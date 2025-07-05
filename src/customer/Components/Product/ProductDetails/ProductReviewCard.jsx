import React from "react";
import { Avatar, Rating, Box, Grid, useMediaQuery } from "@mui/material";

const ProductReviewCard = ({ item }) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="pb-3 border-b last:border-0">
      <Grid container spacing={1}>
        {/* Avatar */}
        <Grid item xs={2}>
          <Box>
            <Avatar
              sx={{
                bgcolor: "#9155FD",
                width: isMobile ? 36 : 48,
                height: isMobile ? 36 : 48,
                fontSize: isMobile ? "0.9rem" : "1.2rem",
              }}
              alt={item?.user?.firstName}
              src={`${baseUrl}${item?.product?.images?.[0]}`}
            >
              {item?.user?.firstName?.[0]?.toUpperCase() || "U"}
            </Avatar>
          </Box>
        </Grid>

        {/* Review Content */}
        <Grid item xs={10}>
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className={`font-semibold ${isMobile ? "text-sm" : "text-base"}`}>
                {item?.user?.firstName || "User"}
              </p>
              <p className={`opacity-60 ${isMobile ? "text-xs" : "text-sm"}`}>
                {new Date(item?.createdAt || Date.now()).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Star Rating */}
            <Rating
              value={item?.rating || 0}
              name="read-only"
              precision={0.5}
              readOnly
              size={isMobile ? "small" : "medium"}
            />

            {/* Title */}
            <p className={`font-semibold ${isMobile ? "text-sm" : "text-base"} text-gray-900`}>
              {item?.review}
            </p>

            {/* Description */}
            {item?.description && (
              <p className={`${isMobile ? "text-xs" : "text-sm"} text-gray-700`}>
                {item.description}
              </p>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
