import React, { useState } from "react";
import bgimg from "../images/bgimg.jpg";
import { Link, useNavigate } from "react-router-dom"; // Correct import
import { ApiServices } from "../services/apiServices";
import { GET_USER } from "../services/url_helper";
import SuccessToast from "../atom-molecules/utils";

function Login() {
  const { showToast, toastComponent } = SuccessToast();
const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    // Remove errors dynamically as the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    if (name === "email") {
      if (!value) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
    }
    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
    }
    return ""; // No errors
  };

  const validateForm = () => {
    let formErrors = {
      email: validateField("email", loginData.email),
      password: validateField("password", loginData.password),
    };

    setErrors(formErrors);
    return !formErrors.email && !formErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await ApiServices.callServicePostWithBodyData(
        GET_USER,
        loginData
      );
      if (result?.response === true) {
        localStorage.setItem('userDetails', JSON.stringify(result?.data));
        showToast("Logged In Successfully!");
        setLoginData({
          email: "",
          password: "",
        });
        setErrors({
          email: "",
          password: "",
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
        <div className="row w-75 rounded bg-light m-auto align-items-center">
          <div className="col-lg-6">
            <img
              src={bgimg}
              alt="background"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="col-lg-6">
            <div className="p-3">
              <p className="text-success fs-1">Log In</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={loginData.email}
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
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                <p>
                  Not Signed In Yet?{" "}
                  <Link to="/register">Click Here To Register</Link>
                </p>
                <button type="submit" className="btn btn-success w-100">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
