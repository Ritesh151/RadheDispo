import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Check if user is logged in on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isOpen ? "200px" : "60px", // Adjust margin dynamically based on sidebar
          transition: "margin-left 0.3s",
          p: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
