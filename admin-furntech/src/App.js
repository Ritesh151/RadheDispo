import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Layout from "./Layout";
import ClientsData from "./Clients-Users/ClientsData";
import AllProducts from "./Products/AllProducts";
import "@fontsource/nunito"; 
import NotFoundPage from "./atom-molecules/NotFoundPage";
import Orders from "./Clients-Users/Orders";

// Create a global Material-UI theme
const theme = createTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif", 
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes with Sidebar Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <ClientsData />
              </Layout>
            }
          />
          <Route
            path="/orders"
            element={
              <Layout>
                <Orders />
              </Layout>
            }
          />
          <Route
            path="/all-products"
            element={
              <Layout>
                <AllProducts />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
