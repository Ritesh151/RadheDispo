import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { ApiServices } from "./services/apiServices";
import {
  ShoppingCart,
  HourglassEmpty,
  CheckCircle,
  People,
  Storefront,
} from "@mui/icons-material";
import {
  GET_ALL_ORDERS_DETAILS,
  GET_ALL_PRODUCTS,
  GET_ALL_USERS,
} from "./services/url_helper";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [timeframe, setTimeframe] = useState("monthly");
  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getOrdersData();
    getUsersData();
    getProducts();
  }, []);

  const getUsersData = async () => {
    try {
      const result = await ApiServices.callServiceGet(GET_ALL_USERS);
      setUsers(result?.data || []);
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  const getProducts = async () => {
    try {
      const result = await ApiServices.callServiceGet(GET_ALL_PRODUCTS);
      setProducts(result?.data || []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  const getOrdersData = async () => {
    try {
      const result = await ApiServices.callServiceGet(GET_ALL_ORDERS_DETAILS);
      const orders = result?.data || [];
      setOrders(orders);
      setTotalOrders(orders.length);
      setPendingOrders(
        orders.filter((order) => order?.orderStatus === "pending").length
      );
      setDeliveredOrders(
        orders.filter((order) => order?.orderStatus === "delivered").length
      );
      updateChartData(orders, timeframe);
    } catch (error) {
      console.error(error);
      setOrders([]);
    }
  };

  const updateChartData = (orders, timeframe) => {
    const now = new Date();
    let startDate;

    if (timeframe === "weekly") {
      startDate = new Date(now.setDate(now.getDate() - now.getDay()));
    } else if (timeframe === "monthly") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    const filteredOrders = (orders || []).filter((order) => {
      const createdAt = new Date(order?.createdAt);
      return createdAt >= startDate && !isNaN(createdAt);
    });

    const data = filteredOrders.map((order) => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      count: 1,
    }));

    setChartData(data);
  };

  useEffect(() => {
    updateChartData(orders, timeframe);
  }, [timeframe, orders]);

  return (
    <Box sx={{ padding: 1, minHeight: "100vh", boxSizing: "border-box" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <StatCard title="Total Orders" value={totalOrders} icon={<ShoppingCart />} />
        <StatCard title="Pending Orders" value={pendingOrders} icon={<HourglassEmpty />} />
        <StatCard title="Delivered Orders" value={deliveredOrders} icon={<CheckCircle />} />
        <StatCard title="Total Users" value={users?.length || 0} icon={<People />} />
        <StatCard title="Total Products" value={products?.length || 0} icon={<Storefront />} />
      </Grid>

      <Card sx={{ marginTop: 4, padding: 2 }}>
        <CardContent>
          <Typography variant="h6">Orders Trend</Typography>
          <Select
            fullWidth
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            size="small"
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>

          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <LineChart
              width={1200}
              height={250}
              series={[
                {
                  data: chartData.map((item) => item.count),
                  label: "Orders",
                  color: "#3f51b5",
                },
              ]}
              xAxis={[
                {
                  scaleType: "point",
                  data: chartData.map((item) => item.date),
                },
              ]}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

// Reusable stat card
const StatCard = ({ title, value, icon }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4">{value}</Typography>
          </Grid>
          <Grid item>{icon}</Grid>
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

export default Dashboard;
