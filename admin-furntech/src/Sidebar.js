import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, navigate: "/" },
    {
      text: "Users",
      icon: <PeopleAltIcon />,
      navigate: "/users",
    },
    {
      text: "Orders",
      icon: <ShoppingCartIcon />,
      navigate: "/orders",
    },
    { text: "Products", icon: <AllInboxIcon />, navigate: "/all-products" },
    { text: "Profile", icon: <AccountCircleIcon />, navigate: "/profile" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: isOpen ? 200 : 60,
          transition: "width 0.3s",
          overflowX: "hidden",
          position: "fixed",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isOpen ? "flex-end" : "center",
          p: 1,
        }}
      >
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems?.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => navigate(item?.navigate)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 1,
              minHeight: 60,
              cursor:"pointer"
            }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>{item?.icon}</ListItemIcon>
            {isOpen && <ListItemText primary={item?.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
