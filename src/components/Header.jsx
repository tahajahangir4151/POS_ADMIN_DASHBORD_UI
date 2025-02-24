import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  TextField,
  Button,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateError, setDateError] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setFromDate(currentDate);
    setToDate(currentDate);
    console.log("Current Date:", currentDate);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const validateDates = () => {
    setDateError("");

    if (!fromDate || !toDate) {
      setDateError("Please select both dates");
      return false;
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    if (startDate > endDate) {
      setDateError("From date must be before To date");
      return false;
    }

    return true;
  };

  const handleApplyDates = () => {
    if (validateDates()) {
      console.log("From:", fromDate, "To:", toDate);
      if (!isMobile) {
        // Make API call here
        console.log("API call with dates:", fromDate, toDate);
      }
    }
  };

  const handleRefresh = () => {
    console.log("Refresh");
    // Add refresh logic here
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handleRefresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = setInterval(() => {
      handleRefresh();
    }, 300000); // 5 minutes

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  const commonTextFieldStyles = {
    bgcolor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 1,
    width: "160px",
    "& .MuiInputBase-root": {
      height: "40px",
      color: "#333333",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: dateError ? "#d32f2f" : "transparent",
      },
      "&:hover fieldset": {
        borderColor: dateError ? "#d32f2f" : "rgba(255, 255, 255, 0.3)",
      },
      "&.Mui-focused fieldset": {
        borderColor: dateError ? "#d32f2f" : "#ffffff",
      },
    },
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#FF5800",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#ffffff",
              textAlign: isMobile ? "center" : "left",
              fontSize: "1.1rem",
              fontWeight: 500,
            }}
          >
            Dashboard
          </Typography>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ color: "#ffffff", minWidth: "45px" }}>
                  From:
                </Typography>
                <TextField
                  type="date"
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                    setDateError("");
                  }}
                  size="small"
                  error={!!dateError}
                  sx={commonTextFieldStyles}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ color: "#ffffff", minWidth: "45px" }}>
                  To:
                </Typography>
                <TextField
                  type="date"
                  value={toDate}
                  onChange={(e) => {
                    setToDate(e.target.value);
                    setDateError("");
                  }}
                  size="small"
                  error={!!dateError}
                  sx={commonTextFieldStyles}
                />
              </Box>
              {dateError && (
                <Typography sx={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  {dateError}
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleApplyDates}
                sx={{
                  bgcolor: "#FF5800",
                  "&:hover": {
                    bgcolor: "#e65000",
                  },
                }}
              >
                Apply Dates
              </Button>
            </Box>
          )}

          <IconButton
            size="large"
            onClick={handleRefresh}
            sx={{
              color: "#ffffff",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <RefreshIcon />
          </IconButton>

          <div>
            <IconButton
              size="large"
              onClick={handleMenu}
              sx={{
                color: "#ffffff",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  "& .MuiMenuItem-root:hover": {
                    bgcolor: "#fff5f0",
                  },
                },
              }}
            >
              <MenuItem onClick={handleClose}>Change Password</MenuItem>
              <Divider sx={{ my: 2 }} />
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ color: "#333333", minWidth: "45px" }}>
              From:
            </Typography>
            <TextField
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setDateError("");
              }}
              size="small"
              error={!!dateError}
              sx={commonTextFieldStyles}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ color: "#333333", minWidth: "45px" }}>
              To:
            </Typography>
            <TextField
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setDateError("");
              }}
              size="small"
              error={!!dateError}
              sx={commonTextFieldStyles}
            />
          </Box>
          {dateError && (
            <Typography sx={{ color: "#d32f2f", fontSize: "0.75rem" }}>
              {dateError}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleApplyDates}
            sx={{
              bgcolor: "#FF5800",
              "&:hover": {
                bgcolor: "#e65000",
              },
            }}
          >
            Apply Dates
          </Button>
        </Box>
      )}
    </>
  );
};

export default Header;
