import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
        Oops! The page you are looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
