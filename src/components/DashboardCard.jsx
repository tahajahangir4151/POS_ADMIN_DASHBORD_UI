import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { keyframes, useTheme } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaidIcon from "@mui/icons-material/Paid";

const borderAnimation = keyframes`
  0% { border-color: transparent; }
  50% { border-color: #FF5800; }
  100% { border-color: transparent; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const DashboardCards = ({ data }) => {
  console.log("DashboardCards data:", data); // Add this line to log the data

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Orders breakdown
  const ordersOrder = [
    "totalFPOrders",
    "totalDastakOrders",
    "totalTAOrders",
    "totalDelievOrders",
  ];

  const ordersBreakdown = ordersOrder.map((key) => ({
    label: key,
    orders: data[key] || 0,
  }));

  const totalOrders = data.totalOrders || 0;

  // Render orders breakdown in the specified order
  const renderOrdersBreakdown = () => {
    return ordersBreakdown.map(({ label, orders }) => (
      <Box key={label} sx={{ mb: 1, p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 0.5,
            transition: "all 0.3s ease",
            "&:hover": { transform: "translateX(10px)" },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#666666",
              textTransform: "capitalize",
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#333333",
              fontWeight: 500,
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
            }}
          >
            {orders}
          </Typography>
        </Box>
      </Box>
    ));
  };

  //Sales breakdown: show separate items for restaurant, foodpanda, dastak, and takeaway.
  const restaurantSales = data.totalCashSale || 0;
  const foodpandaSales = data.totalCreditSale || 0;
  const dastakSales = data.totalRecievables || 0;
  const takeawaySales = data.totalComplimentary || 0;

  // Calculate total, GST and net amount
  const totalWithoutGST =
    restaurantSales + foodpandaSales + dastakSales + takeawaySales;
  const gst = totalWithoutGST * 0.16;
  const netAmount = totalWithoutGST + gst;

  // Render sales breakdown with separate entries for each category
  const renderSalesBreakdown = () => {
    const salesItems = [
      { label: "totalCashSale", amount: restaurantSales },
      { label: "totalCreditSale", amount: foodpandaSales },
      { label: "totalRecievables", amount: dastakSales },
      { label: "totalComplimentary", amount: takeawaySales },
    ];
    return salesItems.map(({ label, amount }) => (
      <Box key={label} sx={{ mb: 1, p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 0.5,
            transition: "all 0.3s ease",
            "&:hover": { transform: "translateX(10px)" },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#666666",
              textTransform: "capitalize",
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#333333",
              fontWeight: 500,
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
            }}
          >
            {amount.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    ));
  };

  return (
    <Grid container spacing={2} sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Orders Card */}
      <Grid item xs={12} md={6} sx={{ mb: isMobile ? 2 : 0 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2 },
            bgcolor: "#FFE5D9",
            borderRadius: 2,
            height: "100%",
            position: "relative",
            transition: "all 0.3s ease",
            border: "2px solid transparent",
            "&:hover": {
              transform: isMobile ? "none" : "translateY(-5px)",
              boxShadow: isMobile
                ? "none"
                : "0 8px 20px rgba(255, 88, 0, 0.15)",
              "&::after": !isMobile && {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: "2px solid #FF5800",
                borderRadius: "8px",
                animation: `${borderAnimation} 2s infinite`,
              },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#FF5800",
                  mb: 1,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Total Orders
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "#333333",
                  fontWeight: 600,
                  fontSize: { xs: "1.8rem", sm: "2.125rem" },
                }}
              >
                {totalOrders}
              </Typography>
            </Box>
            <ShoppingCartIcon
              sx={{
                color: "#FF5800",
                fontSize: { xs: "1.8rem", sm: "2rem" },
                "&:hover": {
                  animation: `${pulseAnimation} 1s infinite`,
                },
              }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#FF5800",
                mb: 2,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Orders Breakdown
            </Typography>
            {renderOrdersBreakdown()}
          </Box>
        </Paper>
      </Grid>

      {/* Sales Card  */}
      <Grid item xs={12} md={6} sx={{ mb: isMobile ? 2 : 0 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2 },
            bgcolor: "#E3F2FD",
            borderRadius: 2,
            height: "100%",
            position: "relative",
            transition: "all 0.3s ease",
            border: "2px solid transparent",
            "&:hover": {
              transform: isMobile ? "none" : "translateY(-5px)",
              boxShadow: isMobile
                ? "none"
                : "0 8px 20px rgba(25, 118, 210, 0.15)",
              "&::after": !isMobile && {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: "2px solid #1976D2",
                borderRadius: "8px",
                animation: `${borderAnimation} 2s infinite`,
              },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#1976D2",
                  mb: 1,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Total Sales
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "#333333",
                  fontWeight: 600,
                  fontSize: { xs: "1.8rem", sm: "2.125rem" },
                }}
              >
                {totalWithoutGST.toFixed(2)}
              </Typography>
            </Box>
            <PaidIcon
              sx={{
                color: "#1976D2",
                fontSize: { xs: "1.8rem", sm: "2rem" },
                "&:hover": {
                  animation: `${pulseAnimation} 1s infinite`,
                },
              }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#1976D2",
                mb: 2,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Sales Breakdown
            </Typography>
            {renderSalesBreakdown()}
          </Box>
          <Divider sx={{ my: 2 }} />
          {/* Sales Summary */}
          <Box sx={{ p: 1 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" sx={{ color: "#666666" }}>
                Total without GST
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#333333", fontWeight: 500 }}
              >
                {totalWithoutGST.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" sx={{ color: "#666666" }}>
                GST (16%)
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#333333", fontWeight: 500 }}
              >
                {gst.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "#666666" }}>
                Net Amount
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#333333", fontWeight: 500 }}
              >
                {netAmount.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardCards;
