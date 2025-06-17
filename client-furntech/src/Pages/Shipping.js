import React, { useContext, useState } from "react";
import { myContext } from "../App";
import { IoIosCloseCircleOutline } from "react-icons/io";
import service from "../services/constant";
import { Link, useNavigate } from "react-router";
import { ApiServices } from "../services/apiServices";
import { CREATE_ORDER, SEND_EMAIL } from "../services/url_helper";
import SuccessToast from "../atom-molecules/utils";
import Modal from "react-bootstrap/Modal";

function Shipping() {
  const { cart, setCart } = useContext(myContext);
  const { showToast, toastComponent } = SuccessToast();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const removeFromCart = (id) => {
    const updatedData = cart.filter((product) => product._id !== id);
    setCart(updatedData);
    localStorage.setItem("orderData", JSON.stringify(updatedData));
  };
  const SubTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [registerData, setRegisterData] = useState({
    name: userDetails.name,
    email: userDetails.email,
    phone: userDetails.phone,
    address: userDetails.address,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
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
      phone: validateField("phone", registerData.phone),
      address: validateField("address", registerData.address),
    };

    setErrors(formErrors);
    return (
      !formErrors.name &&
      !formErrors.email &&
      !formErrors.phone &&
      !formErrors.address
    );
  };

  const handleSendEmail = async () => {
    const data = {
      to: userDetails.email,
      subject: "Your Order Has Been Placed",
      text: "Congratulations! Your order has been placed. It Will be sent to your given address soon.",
    };
    const result = await ApiServices.callServicePostWithBodyData(SEND_EMAIL,data);
    console.log("emailsendresult",result);
    try {
    } catch (error) {
      console.error("Error sending email", error);
    }
  };
  const handlePlaceOrder = async () => {
    if (validateForm()) {
      const cartIds = cart.map((item) => item._id);
      const userDetailsId = userDetails._id;
      const data = {
        productId: cartIds,
        userId: userDetailsId,
        orderStatus: "pending",
      };
      const result = await ApiServices.callServicePostWithBodyData(
        CREATE_ORDER,
        data
      );
      if (result?.response === true) {
        handleSendEmail()
        showToast(result.message);
        setCart([]);
        localStorage.removeItem("orderData");
        setShowModal(true);
      }
    }
  };
  return (
    <>
      {toastComponent}
      <div className="bg-light p-3">
        <div className="w-75 m-auto shadow bg-light rounded p-2">
          <p className="fs-3">Order Details</p>
          <div className="table-responsive rounded">
            <table className="table border">
              <thead className="table-light text-secondary">
                <tr>
                  <th></th>
                  <th></th>
                  <th className="text-secondary">Product</th>
                  <th className="text-secondary">Price</th>
                  <th className="text-secondary">Quantity</th>
                  <th className="text-secondary">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className="btn"
                        onClick={() => {
                          removeFromCart(item._id);
                        }}
                      >
                        <IoIosCloseCircleOutline />
                      </button>
                    </td>
                    <td>
                      <img
                        src={`${service.API_URL}${item.productImage}`}
                        alt={item.name}
                        style={{ height: "70px", width: "70px" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold p-2">
            <span className="">Total</span>
            <span>₹{SubTotal}</span>
          </div>
          <hr />
          <p className="fs-3">Shipping Details</p>
          <div className="row me-0 mb-3">
            <div className="col-lg-6">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={registerData.name}
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
                value={registerData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="number"
              name="phone"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              value={registerData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>
          <div className="mb-3">
            <label>Address</label>
            <textarea
              name="address"
              rows={5}
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              value={registerData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
            {errors.address && (
              <div className="text-danger">{errors.address}</div>
            )}
          </div>
          <p className="fs-3">Payment Method</p>
          <p className="btn shadow">Cash On Delivery</p>
          <div className="text-end">
            <Link to="/cart" className="float-start">
              Go Back to Cart
            </Link>
            <button
              className="btn btn-success"
              onClick={() => {
                handlePlaceOrder();
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <div
            class="tenor-gif-embed"
            data-postid="24122450"
            data-share-method="host"
            data-aspect-ratio="1.02894"
            data-width="50%"
            style={{ margin: "auto" }}
          >
            <a href="https://tenor.com/view/verified-gif-24122450">
              Verified Sticker
            </a>
            from{" "}
            <a href="https://tenor.com/search/verified-stickers">
              Verified Stickers
            </a>
          </div>{" "}
          <script
            type="text/javascript"
            async
            src="https://tenor.com/embed.js"
          ></script>
          <h4 className="mt-3">Your Order Has Been Placed Successfully!</h4>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Shipping;
