import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { keyframes } from '@emotion/react';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered"
];

const CustomStepIcon = ({ icon, active, completed }) => {
  const iconStyle = {
    animation: active ? `${blink} 1s infinite` : "none",
  };

  const icons = {
    1: <ShoppingCartIcon sx={{ color: completed || active ? "#9155FD" : "#ccc", ...iconStyle }} />,
    2: <TaskAltIcon sx={{ color: completed || active ? "#9155FD" : "#ccc", ...iconStyle }} />,
    3: <LocalShippingIcon sx={{ color: completed || active ? "#1976d2" : "#ccc", ...iconStyle }} />,
    4: <DirectionsBikeIcon sx={{ color: completed || active ? "#FB8C00" : "#ccc", ...iconStyle }} />,
    5: <DoneAllIcon sx={{ color: completed || active ? "green" : "#ccc", ...iconStyle }} />,
  };

  return <Box>{icons[icon]}</Box>;
};


export default function OrderTraker({ activeStep }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel={!isMobile}
        orientation={isMobile ? "vertical" : "horizontal"}
        sx={{
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
        }}
      >
{steps.map((label, index) => (
  <Step key={label} completed={index <= activeStep}>
    <StepLabel   StepIconComponent={CustomStepIcon}
      sx={{
        ".MuiStepLabel-label": {
          fontSize: isMobile ? "0.75rem" : "1rem",
          textAlign: "center",
          whiteSpace: "pre-line",
          color: "#9155FD",
        },
      }}
    >
      {label}
    </StepLabel>
  </Step>
))}

      </Stepper>
    </Box>
  );
}
