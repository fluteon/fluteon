import { Box, Chip, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import DoneIcon from "@mui/icons-material/Done";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { useNavigate } from "react-router-dom";

const getStatusIcon = (status) => {
  const normalizedStatus = status.toLowerCase();
  switch (normalizedStatus) {
    case "confirmed":
      return <AccessTimeIcon fontSize="small" color="action" />;
    case "shipped":
      return <LocalShippingIcon fontSize="small" color="primary" />;
    case "delivered":
      return <DoneIcon fontSize="small" color="success" />;
    case "cancelled":
      return <CancelIcon fontSize="small" color="error" />;
    case "returned":
      return <ReplayIcon fontSize="small" color="warning" />;
    default:
      return <AccessTimeIcon fontSize="small" color="action" />;
  }
};

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();

  const isDelivered = order.orderStatus?.toLowerCase() === "delivered";

  // Format updated date
  const updatedDate = new Date(order.statusUpdatedAt);
  const formattedUpdatedDate = updatedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

  // Calculate expected delivery: 5 days from order creation
  const createdDate = new Date(order.createdAt);
  const expectedDateObj = new Date(createdDate);
  expectedDateObj.setDate(createdDate.getDate() + 5);
  const formattedExpectedDate = expectedDateObj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

  const getDeliveryText = () => {
    const status = order.orderStatus?.toLowerCase();
    if (status === "delivered") return `Delivered On`;
    if (status === "shipped") return "Shipped On";
    if (status === "cancelled") return "Cancelled On";
    if (status === "returned") return "Returned On";
    if (status === "confirmed") return "Expected Delivery";
    return "Expected Delivery";
  };

  return (
    <Box className="bg-white p-4 rounded-lg shadow-md border">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <img
            src={item?.product?.imageUrl?.[0]}
            alt={item?.product?.title}
            className="w-[120px] h-[120px] object-cover rounded-md"
          />
        </Grid>

        <Grid item xs={8}>
          <Typography className="text-sm font-semibold mb-1">
            {item?.product?.title}
            <span className="text-gray-600 text-xs font-normal ml-1">
              ₹{item?.product?.discountedPrice}
            </span>
          </Typography>

          <Typography className="text-xs text-gray-500 mb-2">
            Size: {item?.size}
          </Typography>

          <Box className="mt-1 mb-2">
            <Chip
              label={order.orderStatus}
              icon={getStatusIcon(order.orderStatus)}
              color={
                order.orderStatus.toLowerCase() === "delivered"
                  ? "success"
                  : order.orderStatus.toLowerCase() === "cancelled"
                  ? "error"
                  : order.orderStatus.toLowerCase() === "returned"
                  ? "warning"
                  : "primary"
              }
              size="small"
            />
          </Box>

          <Box className="mt-2 flex items-center gap-1 text-green-600 text-xs font-medium">
            <AccessTimeIcon fontSize="small" />
            {getDeliveryText()}:{" "}
            <strong className="ml-1">
              {isDelivered ? formattedUpdatedDate : formattedExpectedDate}
            </strong>
          </Box>
        </Grid>

        {/* Full width Rate & Review (xs=12) */}
        {isDelivered && (
          <Grid item xs={12}>
            <div
              onClick={() => navigate(`/account/rate/${item?.product?._id}`)}
              className="flex items-center text-blue-600 mt-2 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "1.5rem" }} className="mr-1" />
              <span className="text-sm font-medium">Rate & Review Product</span>
            </div>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default OrderCard;
