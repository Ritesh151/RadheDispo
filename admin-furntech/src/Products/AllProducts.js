import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Grid2,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import SuccessToast from "../Login/utils";
import { ApiServices } from "../services/apiServices";
import {
  Add_PRODUCT,
  DELETE_PRODUCT_BY_ID,
  GET_ALL_PRODUCTS,
  UPDATE_PRODUCT_BY_ID,
} from "../services/url_helper";
import GetProducts from "./GetProducts";
import Camera from "@mui/icons-material/Camera";
import service from "../services/constant";

const AllProducts = () => {
  const { showToast, toastComponent } = SuccessToast();
  const [openModal, setOpenModal] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    measurements: "",
    materialUsed: "",
    description: "",
    productImage: {},
    otherDescription: "",
    otherImages: [],
  });
  const [data, setData] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [addOrEditCheck, setAddOrEditCheck] = useState("Add New");
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [productImage, setProductImage] = useState(undefined);
  const [selectedOtherImages, setSelectedOtherImages] = useState([]);
  const [otherImages, setOtherImages] = useState([]);

  //getting data to show in card
  const getData = async () => {
    try {
      const response = await ApiServices.callServiceGet(GET_ALL_PRODUCTS);
      if (response.response === true) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //for close model
  const handleClose = () => {
    setOpenModal(false);
    setProductData({
      name: "",
      price: "",
      category: "",
      measurements: "",
      materialUsed: "",
      description: "",
      productImage: {},
      otherDescription: "",
      otherImages: [],
    });
    setProductImage(undefined);
    setSelectedImage(undefined);
    setOtherImages([]);
  };

  //for changing value
  const handleChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  //for submitting data
  const handleSubmit = async () => {
    try {
      if (!productData.name) {
        showToast("Name is required", "error");
        return;
      }
      if (!productData.price) {
        showToast("Price is required", "error");
        return;
      }
      if (!productData.measurements) {
        showToast("Measurements are required", "error");
        return;
      }
      if (!productData.materialUsed) {
        showToast("Material used is required", "error");
        return;
      }
      if (!productData.description) {
        showToast("Description is required", "error");
        return;
      }
      if (!productData.productImage) {
        showToast("Product Image is required", "error");
        return;
      }

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("measurements", productData.measurements);
      formData.append("materialUsed", productData.materialUsed);
      formData.append("description", productData.description);
      formData.append("otherDescription", productData.otherDescription);

      if (selectedImage) {
        formData.append("productImage", selectedImage);
      }

      selectedOtherImages.forEach((file) => {
        formData.append("otherImages", file);
      });
      const result = await ApiServices.callServicePostWithFormData(
        Add_PRODUCT,
        formData
      );
      if (result.response === true) {
        showToast(result.message);
        handleClose();
        getData();
        setProductImage(undefined);
        setSelectedImage(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //for opening delete model
  const handleDeleteOpen = (id) => {
    setDeleteOpen(true);
    setDeleteId(id);
  };

  //for opening edit model
  const handleEditOpen = (id) => {
    const matchedData = data?.find((item, index) => item?._id === id);
    setUpdateId(matchedData?._id);
    setProductData(matchedData);
    setAddOrEditCheck("Edit");
    setOpenModal(true);
    setProductImage(matchedData?.productImage);
    setOtherImages(matchedData?.otherImages);
  };

  //for deleting product
  const handleDeleteProduct = async () => {
    try {
      const uri = `${DELETE_PRODUCT_BY_ID}/${deleteId}`;
      const result = await ApiServices.callServiceDelete(uri);
      if (result.response === true) {
        showToast(result?.message);
        setDeleteOpen(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //for updating product
  const handleUpdate = async () => {
    try {
      const uri = `${UPDATE_PRODUCT_BY_ID}/${updateId}`;
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("measurements", productData.measurements);
      formData.append("materialUsed", productData.materialUsed);
      formData.append("description", productData.description);
      formData.append("otherDescription", productData.otherDescription);

      if (selectedImage) {
        formData.append("productImage", selectedImage); // Add product image
      }

      selectedOtherImages.forEach((file) => {
        formData.append("otherImages", file); // Add newly selected images
      });

      const result = await ApiServices.callServicePutWithFormData(
        uri,
        formData
      );

      if (result?.response === true) {
        showToast(result?.message);

        // Merge uploaded images into `otherImages`
        const uploadedImagePaths = result?.data?.uploadedOtherImages || []; // Assume API returns uploaded image paths
        setOtherImages((prev) => [...prev, ...uploadedImagePaths]);

        // Clear `selectedOtherImages` after update
        setSelectedOtherImages([]);

        getData(); // Refresh product list
        setOpenModal(false);

        // Reset product data
        setProductData({
          name: "",
          price: "",
          measurements: "",
          materialUsed: "",
          description: "",
          productImage: {},
          otherDescription: "",
          otherImages: [],
        });

        setProductImage(undefined);
        setAddOrEditCheck("Add New");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProductModel = () => {
    setOpenModal(true);
    setAddOrEditCheck("Add New");
  };

  return (
    <>
      {toastComponent}
      <Button
        variant="contained"
        onClick={() => {
          handleAddProductModel();
        }}
      >
        Add Product
      </Button>
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Are You Sure Want To Delete Product?</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="info"
            onClick={() => setDeleteOpen(false)}
          >
            No
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteProduct()}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{addOrEditCheck} Product</DialogTitle>
        <Divider />
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" sx={{ mt: 0 }}>
              <FormLabel
                htmlFor="change-avatar"
                sx={{
                  position: "relative",
                  display: "block",
                  width: "250px",
                  height: "250px",
                  border: "1px dashed",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "secondary.lighter",
                  "&:hover .MuiBox-root": { opacity: 1 },
                  cursor: "pointer",
                }}
              >
                {/* Dynamically show the selected image or fallback to the existing product image */}
                <Box
                  component="img"
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage) // Show selected image preview
                      : productImage
                      ? `${service.API_URL}${productImage}` // Fallback to existing product image
                      : ""
                  }
                  alt="Product Image"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <Stack spacing={0.5} alignItems="center">
                    <Camera style={{ color: "white", fontSize: "2rem" }} />
                    <Typography sx={{ color: "white" }}>Upload</Typography>
                  </Stack>
                </Box>
              </FormLabel>
              <TextField
                type="file"
                id="change-avatar"
                placeholder="Outlined"
                variant="outlined"
                sx={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setSelectedImage(file); // Update the selected image state
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Name"
                name="name"
                value={productData?.name}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={productData?.price}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={productData?.category}
                onChange={handleChange}
              >
                <MenuItem value="Paper Cups">Paper Cups</MenuItem>
                <MenuItem value="Dairy Cups">Dairy Cups</MenuItem>
                <MenuItem value="Eco-Friendly Cups">Eco-Friendly Cups</MenuItem>
                <MenuItem value="Vended Cups">Vended Cups</MenuItem>
                <MenuItem value="Tall Cups">Tall Cups</MenuItem>
                <MenuItem value="Custom Printed Paper Cups">Custom Printed Paper Cups</MenuItem>
                <MenuItem value=" PE Coated Cups"> PE Coated Cups</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Measurements"
                name="measurements"
                value={productData?.measurements}
                multiline={true}
                rows={4}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Material Used"
                name="materialUsed"
                value={productData?.materialUsed}
                multiline={true}
                rows={4}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                name="description"
                value={productData?.description}
                multiline={true}
                rows={4}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Other Description"
                name="otherDescription"
                value={productData?.otherDescription}
                multiline={true}
                rows={4}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </Grid>
          {/* Multiple Images */}
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Typography variant="subtitle1">Other Images:</Typography>
              <input
                type="file"
                multiple
                onChange={(e) =>
                  setSelectedOtherImages(Array.from(e.target.files))
                }
              />
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {/* Preview selected images */}
                {selectedOtherImages.map((file, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={URL.createObjectURL(file)}
                    alt={`Selected Other Image ${index + 1}`}
                    sx={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
                {/* Existing images from backend */}
                {otherImages.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={`${service.API_URL}${image}`}
                    alt={`Other Image ${index + 1}`}
                    sx={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Divider />
        <Grid2
          container
          spacing={2}
          sx={{ padding: 2, display: "flex", justifyContent: "end" }}
        >
          <Grid2 item xs={6}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleClose()}
              sx={{ marginRight: 2 }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                addOrEditCheck !== "Edit" ? handleSubmit() : handleUpdate();
              }}
            >
              {addOrEditCheck !== "Edit" ? <>Add</> : <>Update</>}
            </Button>
          </Grid2>
        </Grid2>
      </Dialog>
      <br />
      <br />
      {/*for showing products on page*/}
      <GetProducts
        data={data}
        handleEditOpen={handleEditOpen}
        handleDeleteOpen={handleDeleteOpen}
      />
    </>
  );
};

export default AllProducts;
