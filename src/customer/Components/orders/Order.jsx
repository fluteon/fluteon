import { Box, Grid, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";
import BackdropComponent from "../BackDrop/Backdrop";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";

const orderStatus = [
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delevered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderHistory({ jwt }));
  }, [jwt]);

  return (
    <Box className="px-4 sm:px-6 md:px-10 mt-4">
      <Grid container spacing={2}>
        {/* Order Status Filters */}
        <Grid item xs={12} md={3}>
          <div className="shadow-lg bg-white border p-5 md:sticky md:top-5 rounded-md">
            <h1 className="font-bold text-lg mb-6">Filters</h1>
            <div className="space-y-4">
              <h2 className="font-semibold">ORDER STATUS</h2>
              {orderStatus.map((option, idx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultValue={option.value}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* Orders */}
        <Grid item xs={12} md={9}>
          {order.orders?.length > 0 ? (
            <Box className="space-y-5">
              {order.orders.map((orderItem) =>
                orderItem?.orderItems?.map((item, index) => (
                  <OrderCard key={item._id || index} item={item} order={orderItem} />
                ))
              )}
            </Box>
          ) : (
            <Box className="flex flex-col items-center justify-center h-[60vh] text-center">
              <ShoppingBagOutlinedIcon
                sx={{ fontSize: 80 }}
                className="text-gray-400 mb-4"
              />
              <Typography variant="h6" className="text-gray-600 mb-2">
                No Orders Found
              </Typography>
              <Button
                onClick={() => navigate("/")}
                variant="contained"
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Continue Shopping
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      <BackdropComponent open={order.loading} />
    </Box>
  );
};

export default Order;
