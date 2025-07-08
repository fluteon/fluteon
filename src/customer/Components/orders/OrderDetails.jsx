import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import OrderTraker from "./OrderTraker";
import BackdropComponent from "../BackDrop/Backdrop";
import { deepPurple } from "@mui/material/colors";
import { motion } from "framer-motion";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike"; // 🛵

import {
  AccessTime,
  LocalShipping,
  Cancel,
  Replay,
  Done,
  Margin,
} from "@mui/icons-material";

const statusStepMap = {
  PLACED: 0,
  CONFIRMED: 1,
  SHIPPED: 2,
  OUTFORDELIVERY: 3,
  DELIVERED: 4,
  CANCELLED: 4,
  RETURNED: 4,
};



const getStatusIcon = (status) => {
  const normalized = status?.toLowerCase().replace(/\s+/g, "");
  switch (normalized) {
    case "confirmed":
      return <AccessTime fontSize="small" color="action" />;
    case "shipped":
      return <LocalShipping fontSize="small" color="primary" />;
    case "outfordelivery":
      return <DirectionsBikeIcon fontSize="small" sx={{ color: "#FB8C00" }} />;
    case "delivered":
      return <Done fontSize="small" color="success" />;
    case "cancelled":
      return <Cancel fontSize="small" color="error" />;
    case "returned":
      return <Replay fontSize="small" color="warning" />;
    default:
      return <AccessTime fontSize="small" color="action" />;
  }
};


const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

// Utility function to normalize status
const normalizeStatus = (status = "") => status.toUpperCase().replace(/\s+/g, "");

const currentOrder = order?.order; // ✅ Move this here
const status = normalizeStatus(currentOrder?.orderStatus);
const activeStep = statusStepMap[status] ?? 0;

const createdDate = new Date(currentOrder?.createdAt);
const expectedDateObj = new Date(createdDate);
expectedDateObj.setDate(createdDate.getDate() + 4);

const formattedExpectedDate = expectedDateObj.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
});

const shouldShowExpectedDate = !["DELIVERED", "CANCELLED", "RETURNED"].includes(status);
const isOutForDelivery = status === "OUTFORDELIVERY";

const getDeliveryText = () => {
  switch (status) {
    case "PLACED":
      return "Order Placed On";
    case "CONFIRMED":
      return "Confirmed On";
    case "SHIPPED":
      return "Shipped On";
    case "OUTFORDELIVERY":
      return "Out for Delivery On";
    case "DELIVERED":
      return "Delivered On";
    case "CANCELLED":
      return "Cancelled On";
    case "RETURNED":
      return "Returned On";
    default:
      return "Status Updated On";
  }
};

const getDeliveryDate = () => {
  const statusUpdated = new Date(currentOrder?.statusUpdatedAt);
  return statusUpdated.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};


  return (
    <>
      {!order.loading && (
        <motion.div
          className="px-2 lg:px-36 space-y-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Address */}
          <Grid container className="p-3 shadow-lg bg-white rounded-md">
            <Grid item xs={12}>
              <Typography className="font-bold text-lg pb-2">
                Delivery Address
              </Typography>
              <AddressCard address={currentOrder?.shippingAddress} />
            </Grid>
          </Grid>

          {/* Order Tracker & Action */}
          <Box className="p-5 shadow-lg border rounded-md bg-white">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={9}>
                <OrderTraker activeStep={activeStep} />
                {shouldShowExpectedDate && (
  <Box className="pt-2 text-sm text-gray-700">
{shouldShowExpectedDate && (
  <Box className="pt-2 text-sm">
    {isOutForDelivery ? (
      <Typography
        sx={{
          color: "#FB8C00", // orange color
          fontWeight: 500,
        }}
      >
       Your item's is Out for Delivery, It will be delivered today
      </Typography>
    ) : (
      <Typography sx={{ color: "#FB8C00" /* text-gray-600 */, fontSize: "14px" }}>
        Expected Delivery:{" "}
        <span style={{ fontWeight: 600, color: "#000000" }}>
          {formattedExpectedDate}
        </span>
      </Typography>
    )}
  </Box>
)}

  </Box>
)}

              </Grid>
              <Grid item>
                {status === "DELIVERED" && (
                  <Button variant="text" color="error">
                    RETURN
                  </Button>
                )}
                {status !== "DELIVERED" && (
                  <Button
                    variant="text"
                    sx={{ color: deepPurple[500] }}
                  >
                    Cancel Order
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>

          {/* Order Items */}
<Grid container spacing={2}>
  {currentOrder?.orderItems?.map((item, index) => (
    <Grid
      key={index}
      item
      xs={12}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <Box className="p-5 shadow-md rounded-md border bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Left Section: Image and Info */}
        <div className="flex gap-4 items-start w-full md:w-auto">
          <img
            src={item?.product?.imageUrl?.[0]}
            alt="Product"
            className="w-[80px] h-[80px] object-cover rounded"
          />
          <Box className="space-y-1">
            <Typography className="font-medium">
              {item?.product?.title}
            </Typography>
            <Typography className="text-sm text-gray-600">
              Color: {item?.product?.color} | Size: {item?.size}
            </Typography>
            <Typography className="text-sm text-gray-600">
              ₹{item?.discountedPrice} | Quantity : {item?.quantity}
            </Typography>
            <Typography className="text-sm text-gray-600">
              Seller: {item?.product?.brand}
            </Typography>
          </Box>
        </div>

        {/* Rate & Review - Mobile Below and Desktop Right */}
        {status === "DELIVERED" && (
          <Box
            sx={{ color: deepPurple[500] }}
            className="flex items-center cursor-pointer w-full md:w-auto justify-start md:justify-end"
            onClick={() =>
              navigate(`/account/rate/${item?.product?._id}`)
            }
          >
            <StarIcon sx={{ fontSize: "1.8rem", mr: 1 }} />
            <span>Rate & Review</span>
          </Box>
        )}
      </Box>
    </Grid>
  ))}
</Grid>


          {/* Order Status Chip */}
<Box className="pt-4 pb-10">
  <Chip
    label={currentOrder?.orderStatus}
    icon={getStatusIcon(status)}
    color={
      status === "DELIVERED"
        ? "success"
        : status === "CANCELLED"
        ? "error"
        : status === "RETURNED"
        ? "warning"
        : status === "OUTFORDELIVERY"
        ? "warning"
        : "primary"
    }
  />
  
  {/* ✅ Status update text and date */}
<Typography
  sx={{
    fontSize: "14px",
    color: "#4B5563", // Tailwind's gray-700
    marginTop: "8px",
    marginLeft: "2px",
  }}
>
  {getDeliveryText()}:{" "}
  <span style={{ fontWeight: 500, color: "#000000" }}>
    {getDeliveryDate()}
  </span>
</Typography>

</Box>

        </motion.div>
      )}

      <BackdropComponent open={order.loading} />
    </>
  );
};

export default OrderDetails;
