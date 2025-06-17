import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import service from "../services/constant";

const GetProducts = ({ data, handleEditOpen, handleDeleteOpen }) => {
  return (
    <>
      <Grid container spacing={2}>
        {data?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${service.API_URL}${item.productImage}`} // Construct the full image URL
                  alt={item?.name || "No image"}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.name} - ₹{item?.price}
                  </Typography>
                  <Typography variant="body2">
                    Description: <br />
                    <span style={{ color: "gray" }}>{item?.description}</span>
                  </Typography>
                  <Typography variant="body2">
                    Measurements: <br />
                    <span style={{ color: "gray" }}>{item?.measurements}</span>
                  </Typography>
                  <Typography variant="body2">
                    Material Used: <br />
                    <span style={{ color: "gray" }}>{item?.materialUsed}</span>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="info"
                  onClick={() => handleEditOpen(item?._id)}
                >
                  <EditIcon />
                </Button>
                <Button
                  size="small"
                  color="warning"
                  onClick={() => handleDeleteOpen(item?._id)}
                >
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default GetProducts;
