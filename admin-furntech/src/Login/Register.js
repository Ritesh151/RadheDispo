import React, { useState } from "react";
import {
  Container,
  FormControl,
  TextField,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { ApiServices } from "../services/apiServices";
import { useNavigate } from "react-router-dom";
import { CREATE_ADMIN } from "../services/url_helper";
import SuccessToast from "./utils";

const Register = () => {
  const { showToast, toastComponent } = SuccessToast();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      if (data?.fullName === "") {
        showToast("Full Name is required", "error");
        return;
      }

      if (!data?.email) {
        showToast("Email is required", "error");
        return;
      }
      
      // Regular expression for validating email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(data?.email)) {
        showToast("Please enter a valid email address", "error");
        return;
      }
      
      if (data?.password === "") {
        showToast("Password is required", "error");
        return;
      }

      if (!data?.phone) {
        showToast("Phone number is required", "error");
        return;
      }

      if (!data?.phone || data.phone.toString().length !== 10) {
        showToast("Phone number must be exactly 10 digits long", "error");
        return;
      }
      
      const reqObj = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      const result = await ApiServices.callServicePostWithBodyData(
        CREATE_ADMIN,
        reqObj
      );
      if (result?.response === true) {
        showToast("Admin Created Successfully!");
        setData({});
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        showToast(result?.message, "error");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f5f5f5" 
      >
        {/* For showing toast */}
        {toastComponent}
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3} 
            p={4} 
            borderRadius={5} 
            boxShadow={4} 
            bgcolor="white" 
          >
            <Typography variant="h5" component="h1" gutterBottom>
              Register Your Details
            </Typography>
            <FormControl fullWidth>
              <Box mb={2}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={data?.fullName}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Email"
                  name="email"
                  value={data?.email}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={data?.password}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={data?.phone}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                />
              </Box>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;
