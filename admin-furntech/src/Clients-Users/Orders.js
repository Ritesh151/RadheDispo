import React, { useEffect, useState } from "react";
import { ApiServices } from "../services/apiServices";
import {
  GET_ALL_ORDERS_DETAILS,
  UPDATE_ORDER_STATUS,
} from "../services/url_helper";
import {
  List,
  ListItem,
  Typography,
  Container,
  Paper,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
} from "@mui/material";
import SuccessToast from "../Login/utils";
import service from "../services/constant";

function Orders() {
  const { showToast, toastComponent } = SuccessToast();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  const getData = async () => {
    try {
      const result = await ApiServices.callServiceGet(GET_ALL_ORDERS_DETAILS);
      setOrders(result?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const result = await ApiServices.callServicePutWithBodyData(
        `${UPDATE_ORDER_STATUS}/${orderId}`,
        {
          orderStatus: newStatus,
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      showToast(result?.message);
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.orderStatus === filter);

  return (
    <>
    {toastComponent}
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          Orders List
        </Typography>
        <ButtonGroup fullWidth sx={{ marginBottom: 2 }}>
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "contained" : "outlined"}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("pending")}
            variant={filter === "pending" ? "contained" : "outlined"}
          >
            Pending
          </Button>
          <Button
            onClick={() => setFilter("in progress")}
            variant={filter === "in progress" ? "contained" : "outlined"}
          >
            In Progress
          </Button>
          <Button
            onClick={() => setFilter("delivered")}
            variant={filter === "delivered" ? "contained" : "outlined"}
          >
            Delivered
          </Button>
        </ButtonGroup>
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f9f9f9" }}>
          <List>
            {filteredOrders.map((order) => (
              <ListItem
                key={order._id}
                divider
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Typography variant="h6" gutterBottom>
                  User: {order.user.name} (Email: {order.user.email})
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Address: {order.user.address} | Phone: {order.user.phone}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginTop: 1,
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    Order Status:
                  </Typography>
                  <Select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    size="small"
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in progress">In Progress</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                  </Select>
                </Box>
                <Typography variant="body2" marginTop={1} fontWeight="bold">
                  Products:
                </Typography>
                <List
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    padding: 1,
                  }}
                >
                  {order.products.map((product) => (
                    <ListItem
                      key={product._id}
                      sx={{ display: "flex", alignItems: "center", gap: 2 }}
                    >
                      <Avatar
                        variant="square"
                        src={`${service.API_URL}${product.productImage}`}
                        sx={{ width: 56, height: 56 }}
                      />
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          {product.name} - ₹{product.price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {product.description}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default Orders;
