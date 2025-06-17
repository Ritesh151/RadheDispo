import React, { useState } from "react";
import bgimg from "../images/why-choose-us.png";
import { Link, useNavigate } from "react-router-dom"; // Correct import
import { ApiServices } from "../services/apiServices";
import { CREATE_USER } from "../services/url_helper";
import SuccessToast from "../atom-molecules/utils";

function Register() {
  const { showToast, toastComponent } = SuccessToast();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
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
      if (value.length < 6) return "Password must be at least 6 characters";
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
      name: validateField("name", registerData.name),
      email: validateField("email", registerData.email),
      password: validateField("password", registerData.password),
      phone: validateField("phone", registerData.phone),
      address: validateField("address", registerData.address),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await ApiServices.callServicePostWithBodyData(
        CREATE_USER,
        registerData
      );
      if (result?.response === true) {
        localStorage.setItem('userDetails', JSON.stringify(result?.data));
        showToast("Registered successfully!");
        setRegisterData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
        });
        setErrors({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
        });
        setTimeout(() => {
          navigate('/')
        }, 1000);
      } else {
        showToast(result?.error||result?.message, "error");
      }
    }
  };

  return (
    <>
      {toastComponent}
      <div className="bg-light py-5">
        <div className="row w-75 rounded bg-light m-auto">
          <div className="col-lg-6">
            <div className="p-3">
              <p className="text-success fs-1">Register</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={registerData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={registerData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    value={registerData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <input
                    type="number"
                    name="phone"
                    className={`form-control ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    value={registerData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                  />
                  {errors.phone && (
                    <div className="text-danger">{errors.phone}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <textarea
                    name="address"
                    rows={5}
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    value={registerData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                  {errors.address && (
                    <div className="text-danger">{errors.address}</div>
                  )}
                </div>
                <p>
                  Already Registered?{" "}
                  <Link to="/login">Click Here To Log In</Link>
                </p>
                <button type="submit" className="btn btn-success w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              src={bgimg}
              alt="background"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
