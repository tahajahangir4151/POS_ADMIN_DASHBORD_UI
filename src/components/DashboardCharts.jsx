import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardCharts = ({ data }) => {
  // Colors from the image
  const dayColors = ["#FF9999", "#99FF99", "#9999FF", "#FFCC99"];
  const timeColor = "#4CAF50";
  const foodColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFCC99"];

  const calculatePercentages = (salesData) => {
    if (!salesData || salesData.length === 0) return [];
    const total = salesData.reduce((sum, item) => sum + item.amount, 0);
    return salesData.map((item) => ({
      name: item.name || item.day,
      value: Number(((item.amount / total) * 100).toFixed(1)),
      amount: item.amount,
    }));
  };

  const daysData = calculatePercentages(data?.dailySales || []);
  const foodData = calculatePercentages(
    (data?.top4ProdSales || []).map((item) => ({
      name: item.productName,
      amount: item.top4ProdSale,
    }))
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: "white",
            p: 1,
            border: "1px solid #ccc",
            borderRadius: 1,
          }}
        >
          <Typography variant="body2">
            {`${payload[0].name}: ${payload[0].value}%`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Grid container spacing={2}>
        {/* Popular Days Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              minHeight: 300,
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Most Popular Days
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flex: 1, height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={daysData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {daysData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={dayColors[index % dayColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ width: 120, ml: 2 }}>
                {daysData.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor: dayColors[index % dayColors.length],
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">
                      {item.name}: {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Popular Time Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              minHeight: 300,
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Most Popular Time
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flex: 1, height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.timeSlots || []}>
                    <XAxis dataKey="time" />
                    <Tooltip />
                    <Bar
                      dataKey="sales"
                      fill={timeColor}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ width: 120, ml: 2 }}>
                {(data?.timeSlots || []).map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor: timeColor,
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">
                      {item.time}: {item.sales}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Popular Foods Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              minHeight: 300,
              transition: "all 0.3s",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Most Popular Food
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flex: 1, height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={foodData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {foodData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={foodColors[index % foodColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ width: 120, ml: 2 }}>
                {foodData.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor: foodColors[index % foodColors.length],
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">
                      {item.name}: {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCharts;
