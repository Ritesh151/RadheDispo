import React, { useEffect, useState } from 'react';
import { ApiServices } from "../services/apiServices";
import { GET_ALL_USERS } from '../services/url_helper';
import { List, ListItem, ListItemText, Typography, Container, Paper } from '@mui/material';

const ClientsData = () => {
  const [users, setUsers] = useState([]);

  const getData = async () => {
    try {
      const result = await ApiServices.callServiceGet(GET_ALL_USERS);
      setUsers(result?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users Data
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {users.map((user) => (
            <ListItem key={user._id} divider>
              <ListItemText
                primary={user.name}
                secondary={`Email: ${user.email} | Phone: ${user.phone} | Address: ${user.address}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ClientsData;
