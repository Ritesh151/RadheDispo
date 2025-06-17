import React, { useEffect, useState } from "react";
import { ApiServices } from "../services/apiServices";
import { GET_USER_BY_ID, UPDATE_USER_BY_ID } from "../services/url_helper";
import SuccessToast from "../atom-molecules/utils";

function Myinfo() {
  const { showToast, toastComponent } = SuccessToast();
  const getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [data, setData] = useState({});

  const getData = async () => {
    const uri = `${GET_USER_BY_ID}/${getUserDetails._id}`;
    const result = await ApiServices.callServiceGet(uri);
    if (result.response === true) {
      setData(result.result);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    // Remove errors dynamically as the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    if (name === "name") {
      if (!value) return "Name is required";
    }
    if (name === "email") {
      if (!value) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
    }
    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 Characters";
    }
    if (name === "phone") {
      if (!value) return "Phone number is required";
      if (value.length < 10) return "Phone number must be at least 10 digits";
    }
    if (name === "address") {
      if (!value) return "Address is required";
    }
    return ""; // No errors
  };

  const validateForm = () => {
    let formErrors = {
      name: validateField("name", data.name),
      email: validateField("email", data.email),
      phone: validateField("phone", data.phone),
      password: validateField("password", data.password),
      address: validateField("address", data.address),
    };

    setErrors(formErrors);
    return (
      !formErrors.name &&
      !formErrors.email &&
      !formErrors.password &&
      !formErrors.phone &&
      !formErrors.address
    );
  };

  const updateUser = async () => {
    try {
      if (validateForm()) {
        const uri = `${UPDATE_USER_BY_ID}/${data._id}`;
        const result = await ApiServices.callServicePutWithBodyData(uri, data);
        console.log("data updated", result);
        if(result.response === true){
          showToast("User Updated Successfully");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    {toastComponent}
      <div className="p-3">
        <div className="bg-light p-3 w-75 m-auto shadow">
          <p className="fs-2 fw-bold text-center">My Info</p>
          <div className="row me-0 mb-3">
            <div className="col-lg-6">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={data.name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="col-lg-6">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={data.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="row me-0 mb-3">
            <div className="col-lg-6 mb-3">
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                value={data.phone}
                onChange={handleChange}
                placeholder="Enter phone"
              />
              {errors.phone && (
                <div className="text-danger">{errors.phone}</div>
              )}
            </div>
            <div className="col-lg-6 mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={data.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label>Address</label>
            <textarea
              name="address"
              rows={5}
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              value={data.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
            {errors.address && (
              <div className="text-danger">{errors.address}</div>
            )}
          </div>
          <div className="w-100 text-end">
            <button
              className="btn btn-dark"
              onClick={() => {
                updateUser();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Myinfo;
