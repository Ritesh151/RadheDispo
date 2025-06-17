import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { ApiServices } from "./services/apiServices";
import { GET_ADMIN_BY_ID, UPDATE_ADMIN_BY_ID } from "./services/url_helper";
import SuccessToast from "./Login/utils";
import Camera from "@mui/icons-material/Camera";

const Profile = () => {
  const { showToast, toastComponent } = SuccessToast();
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState("");
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(""); // State for preview image

  // Fetching admin data
  const getUser = useCallback(async () => {
    try {
      const result = await ApiServices.callServicePostWithBodyData(
        `${GET_ADMIN_BY_ID}/${userData?._id}`
      );
      if (result?.response === true) {
        setData(result?.data);
        setAvatar(result?.data?.profileImage);
      }
    } catch (error) {
      console.error(error);
    }
  }, [userData?._id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userData?._id) {
      getUser();
    }
  }, [userData?._id, getUser]);

  // Function to validate file size and set the selected image
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if the file size exceeds 2MB
      if (file.size > 2 * 1024 * 1024) {
        showToast("File size exceeds the 2MB limit", "error");
        return;
      }
      setSelectedImage(file);

      // Update preview image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImage(fileReader.result); // Set the preview URL
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      const uri = `${UPDATE_ADMIN_BY_ID}/${userData?._id}`;
      const formData = new FormData();
      formData.append("fullName", data.fullName || "");
      formData.append("email", data.email || "");
      formData.append("phone", data.phone || "");
      formData.append("password", data.password || "");
      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      const result = await ApiServices.callServicePutWithFormData(uri, formData);
      if (result?.response === true) {
        showToast(result?.message);
        getUser();
      } else {
        showToast(result?.message || "Error Occurred!", "error");
      }
    } catch (error) {
      console.error("Error updating admin", error);
    }
  };

  return (
    <>
      {toastComponent}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          padding: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} xl={6} margin={"auto"}>
              <Stack direction="row" justifyContent="center" sx={{ mt: 0 }}>
                <FormLabel
                  htmlFor="change-avatar"
                  sx={{
                    position: "relative",
                    borderRadius: "50%",
                    overflow: "hidden",
                    "&:hover .MuiBox-root": { opacity: 1 },
                    cursor: "pointer",
                  }}
                >
                  {/* Show preview image if selected; otherwise show avatar */}
                  <Avatar
                    alt="Avatar"
                    src={previewImage || avatar}
                    sx={{ width: 110, height: 110, border: "1px dashed" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack spacing={0.5} alignItems="center">
                      <Camera style={{ color: "white", fontSize: "2rem" }} />
                      <Typography sx={{ color: "GrayText" }}>
                        Upload
                      </Typography>
                    </Stack>
                  </Box>
                </FormLabel>
                <TextField
                  type="file"
                  id="change-avatar"
                  placeholder="Outlined"
                  variant="outlined"
                  sx={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} xl={6} margin={"auto"}>
              <Typography variant="h4" textAlign="start" marginBottom={2}>
                {data?.fullName}'s Profile!
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    value={data?.fullName || ""}
                    fullWidth
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={data?.email || ""}
                    fullWidth
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={data?.phone || ""}
                    fullWidth
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={data?.password || ""}
                    fullWidth
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Profile;
