import React, { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  TextField,
  Box,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { ApiServices } from "../services/apiServices";
import { GET_ADMIN_DETAILS } from "../services/url_helper";
import { useNavigate } from "react-router-dom";
import SuccessToast from "./utils";

const Login = () => {
  const { showToast, toastComponent } = SuccessToast();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (isLoggedIn) {
      navigate("/"); // Redirect to dashboard if logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      if (loginData?.email === "") {
        showToast("Email is required", "error");
        return;
      }
      if (loginData?.password === "") {
        showToast("Password is required", "error");
        return;
      }
      const reqObj = {
        email: loginData.email,
        password: loginData.password,
      };
      const result = await ApiServices.callServicePostWithBodyData(
        GET_ADMIN_DETAILS,
        reqObj
      );
      if (result?.response === true) {
        // Save authentication token or flag in localStorage
        localStorage.setItem("authToken", result?.token || "true");
        localStorage.setItem("userDetails", JSON.stringify(result?.data));
        showToast("Logged in successfully!");
        setLoginData({});
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
        {/* for showing toast use this */}
        {toastComponent}
        <Container maxWidth="sm" >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            p={5}
            borderRadius={5}
            boxShadow={3}
            bgcolor="white"
          >
            <Typography variant="h5" component="h1" gutterBottom>
              Welcome! Admin
            </Typography>
            <FormControl fullWidth>
              <TextField
                label="Email"
                name="email"
                value={loginData?.email}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                margin="normal"
                value={loginData?.password}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: "16px" }}
            >
              Not registered?{" "}
              <Link
                onClick={() => navigate("/register")}
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  cursor: "pointer",
                }}
              >
                Click here to register
              </Link>
            </Typography>
            {/* <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => navigate("/register")}
            >
              Register
            </Button> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
