import React, { useState } from "react";
import { ApiServices } from "../services/apiServices";
import bgimg from "../images/bgimg.jpg";
import { CUSTOMIZATION_INQUIRY_CREATE } from "../services/url_helper";
import SuccessToast from "../atom-molecules/utils";

const CustomizePage = () => {
  const { showToast, toastComponent } = SuccessToast();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

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
    if (name === "phone") {
      if (!value) return "Phone number is required";
      if (value.length < 10) return "Phone number must be at least 10 digits";
    }
    if (name === "address") {
      if (!value) return "Address is required";
    }
    if (name === "message") {
      if (!value) return "Message is required";
    }
    return "";
  };

  const validateForm = () => {
    let formErrors = {
      name: validateField("name", data.name),
      email: validateField("email", data.email),
      phone: validateField("phone", data.phone),
      address: validateField("address", data.address),
      message: validateField("message", data.message),
    };

    setErrors(formErrors);
    return (
      !formErrors.name &&
      !formErrors.email &&
      !formErrors.phone &&
      !formErrors.address &&
      !formErrors.message
    );
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const result = await ApiServices.callServicePostWithBodyData(
        CUSTOMIZATION_INQUIRY_CREATE,
        data
      );
      if (result?.response === true) {
        showToast(result?.message);
        setData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      }
    }
  };

  return (
    <>
      {toastComponent}
      <div className="bg-light">
        <div className="row me-0 p-5">
          <div className="col-lg-6">
            <img src={bgimg} alt="Paper Cup Manufacturing" className="img-fluid" />
          </div>
          <div className="col-lg-6">
            <p className="fs-1">
              Paper Cup <span className="text-success">Customization</span>
            </p>
            <ul className="fs-5">
              <li>Brand Printing on Paper Cups</li>
              <li>Size & Volume Customization (4oz to 16oz)</li>
              <li>Material Options (Single/Double Wall)</li>
              <li>Eco-friendly/Biodegradable Options</li>
              <li>Bulk Order Packaging</li>
            </ul>
          </div>
        </div>
        <div className="my-2">
          <p className="ps-3">
            <span className="text-success">Note:</span> If you are looking to customize paper cups for your brand, cafe, or event — please leave your details below. Our team will get in touch with you.
          </p>
          <div className="w-75 m-auto border rounded p-2">
            <p className="fs-2">Send Us Your Requirements</p>
            <div className="row me-0">
              <div className="mb-3 col-lg-6">
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
              <div className="mb-3 col-lg-6">
                <label>Phone</label>
                <input
                  type="number"
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  value={data.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label>Address</label>
                <textarea
                  name="address"
                  rows={3}
                  className={`form-control ${errors.address ? "is-invalid" : ""}`}
                  value={data.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                />
                {errors.address && <div className="text-danger">{errors.address}</div>}
              </div>
              <div className="mb-3">
                <label>Customization Message</label>
                <textarea
                  name="message"
                  rows={5}
                  className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  value={data.message}
                  onChange={handleChange}
                  placeholder="Tell us your requirements"
                />
                {errors.message && <div className="text-danger">{errors.message}</div>}
              </div>
            </div>
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizePage;
