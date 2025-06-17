import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const SuccessToast = () => {
  const [toastConfig, setToastConfig] = useState({
    open: false,
    message: "",
    color: "success", // Default color
  });

  // Function to show toast dynamically
  const showToast = (message, color = "success") => {
    setToastConfig({
      open: true,
      message,
      color,
    });
  };

  // Close the toast
  const handleClose = () => {
    setToastConfig((prev) => ({ ...prev, open: false }));
  };

  return {
    showToast,
    toastComponent: (
      <Snackbar
        open={toastConfig.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={toastConfig.color}
          sx={{ width: "100%" }}
        >
          {toastConfig.message}
        </Alert>
      </Snackbar>
    ),
  };
};

export default SuccessToast;
