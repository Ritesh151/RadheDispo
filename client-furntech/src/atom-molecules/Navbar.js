import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Offcanvas,
  Badge,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  PersonCircle,
  Cart3,
  Heart,
  List,
} from "react-bootstrap-icons";
import { myContext } from "../App";
import service from "../services/constant";
import { MdDelete } from "react-icons/md";
import SuccessToast from "./utils";
import { FaInfoCircle } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

const CustomNavbar = () => {
  const { showToast, toastComponent } = SuccessToast();
  const { cart, setCart, favoriteProducts } = useContext(myContext);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showAddtoCart, setShowAddtoCart] = useState(false);
  const loginDetails = JSON.parse(localStorage.getItem("userDetails"));
  const SubTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item._id !== product._id);
    setCart(updatedCart);
    showToast("Product removed from cart!", "error");
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setIsScrolled(window.scrollY > 100);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {toastComponent}
      {/* Top Navbar */}
      <Navbar
        bg="white"
        expand="md"
        fixed={isScrolled ? "top" : ""}
        className="shadow-sm px-3"
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand
            onClick={() => navigate("/")}
            className="fw-bold fs-3"
            style={{ cursor: "pointer" }}
          >
            <span style={{ color: "#2E3A59" }}>R</span>adhe 
            <span style={{ color: "#2E3A59" }}>D</span>ispo
            <span style={{ color: "#2E3A59" }}>W</span>orld


          </Navbar.Brand>

          {/* Sidebar Toggle Button (Mobile Only) */}
          {isMobile && (
            <Button variant="light" onClick={() => setShowSidebar(true)}>
              <List size={28} />
            </Button>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <Nav className="mx-auto">
                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                <Nav.Link onClick={() => navigate("/products/all")}>
                  Products
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/customize")}>
                  Customization
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/about-us")}>
                  About Us
                </Nav.Link>
              </Nav>

              {/* Desktop Icons with Badges */}
              <div className="d-flex align-items-center gap-4">
                <div style={{ position: "relative", cursor: "pointer" }}>
                  <Cart3
                    size={22}
                    onClick={() => {
                      setShowAddtoCart(true);
                    }}
                  />
                  {cart?.length > 0 && (
                    <Badge
                      pill
                      bg="secondary"
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {cart?.length}
                    </Badge>
                  )}
                </div>

                <div style={{ position: "relative", cursor: "pointer" }}>
                  <Heart
                    size={22}
                    onClick={() => {
                      navigate("/favorite");
                    }}
                  />
                  {favoriteProducts?.length > 0 && (
                    <Badge
                      pill
                      bg="secondary"
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {favoriteProducts?.length}
                    </Badge>
                  )}
                </div>
                {loginDetails === null ? (
                  <>
                    <button
                      className="btn"
                      onClick={() => {
                        navigate("/login");
                      }}
                      style={{ background: "#8B9E70", color: "white" }}
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <PersonCircle size={22} />
                        &nbsp;{loginDetails.name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <Dropdown.Item onClick={() => navigate("/my-info")}>
                          <FaInfoCircle />
                          &nbsp; My Info
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/order-status")}>
                          <Cart3 size={16}></Cart3>
                          &nbsp; Order Status
                        </Dropdown.Item>
                        <Dropdown.Item
                          style={{ color: "red" }}
                          onClick={handleLogout}
                        >
                          <RiLogoutBoxLine />
                          &nbsp; Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </div>
            </>
          )}
        </Container>
      </Navbar>

      {/* Offcanvas Sidebar (Mobile View) */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-3 fw-bold">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          {/* Navigation Links */}
          <Nav className="flex-column">
            <Nav.Link style={{ color: "black" }} onClick={() => navigate("/")}>
              Home
            </Nav.Link>
            <Nav.Link
              style={{ color: "black" }}
              onClick={() => navigate("/products/all")}
            >
              Products
            </Nav.Link>
            <Nav.Link
              style={{ color: "black" }}
              onClick={() => navigate("/services")}
            >
              Customization
            </Nav.Link>
            <Nav.Link
              style={{ color: "black" }}
              onClick={() => navigate("/about-us")}
            >
              About Us
            </Nav.Link>
          </Nav>

          {/* Icons at the bottom (Without Badges) */}
          <div className="position-absolute bottom-0 start-0 end-0 p-3 border-top d-flex justify-content-evenly bg-white">
            <div className="d-flex align-items-center gap-3 justify-content-evenly">
              {loginDetails === null ? (
                <>
                  <button
                    className="btn"
                    onClick={() => {
                      navigate("/login");
                    }}
                    style={{ background: "#8B9E70", color: "white" }}
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      <PersonCircle size={22} />
                      &nbsp;{loginDetails.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item onClick={() => navigate("/my-info")}>
                        <FaInfoCircle /> &nbsp; My Info
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate("/order-status")}>
                          <Cart3 size={16}></Cart3>
                          &nbsp;  Order Status
                        </Dropdown.Item>
                      <Dropdown.Item
                        style={{ color: "red" }}
                        onClick={handleLogout}
                      >
                        <RiLogoutBoxLine />
                        &nbsp; &nbsp;Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}

              <div style={{ position: "relative", cursor: "pointer" }}>
                <Cart3
                  size={22}
                  onClick={() => {
                    setShowAddtoCart(true);
                  }}
                />
                {cart?.length > 0 && (
                  <Badge
                    pill
                    bg="secondary"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {cart?.length}
                  </Badge>
                )}
              </div>

              <div style={{ position: "relative", cursor: "pointer" }}>
                <Heart
                  size={22}
                  onClick={() => {
                    navigate("/favorite");
                  }}
                />
                {favoriteProducts?.length > 0 && (
                  <Badge
                    pill
                    bg="secondary"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {favoriteProducts?.length}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* offcanvas for add to cart show */}
      <Offcanvas
        show={showAddtoCart}
        onHide={() => setShowAddtoCart(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-3 fw-bold">Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          className=""
          style={{
            overflowY: "auto",
            maxHeight: "calc(100vh - 140px)",
            paddingBottom: "20%",
          }}
        >
          <div className="mt-2 m-auto">
            {Array.isArray(cart) && cart.length > 0 ? (
              cart.map((user, index) => (
                <div className="card mb-3" key={user.id ? user.id : index}>
                  <div className="row g-0">
                    <div className="col-4 p-2">
                      <img
                        src={`${service.API_URL}${user.productImage}`}
                        className="img-fluid"
                        alt={user.name || "Product Image"}
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h6 className="card-title">
                          {user.name}
                          <span
                            className="float-end"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              removeFromCart(user);
                            }}
                          >
                            <MdDelete size={20} />
                          </span>
                        </h6>
                        <p className="card-text">
                          ₹{user.price} x {user.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart.</p>
            )}
          </div>

          {/* Icons at the bottom (Without Badges) */}
          <div className="position-absolute bottom-0 start-0 end-0 p-3 border-top d-flex justify-content-evenly bg-white">
            <p className="d-flex justify-content-between align-items-center mb-1">
              <span className="fw-bold">Subtotal:&nbsp;</span>
              <span className="fw-bold text-success">₹{SubTotal}</span>
            </p>
            <div className="d-flex align-items-center gap-3 justify-content-evenly">
              <button
                className="btn btn-dark"
                disabled={cart.length <= 0}
                onClick={() => {
                  navigate("/cart");
                }}
              >
                View Cart
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;
