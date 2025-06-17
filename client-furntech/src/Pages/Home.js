import React, { useState } from "react";
import bgimg from "../images/bgimg.jpg";
import image from "../images/imageset1.png";
import image2 from "../images/imageset2.png";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router";
import CategoryData from "./CategoryData";

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div className="bg-light">
        {/* Hero Section */}
        <div className="row me-0">
          <div
            className="col-lg-6 p-5"
            style={{ backgroundColor: "#F5F1EA", color: "#333" }}
          >
            <div className="w-75 m-auto py-5">
              <p className="text-uppercase fw-bold text-secondary">
                Radhe Paper Products
              </p>
              <p className="display-6 fw-bold">
                Unique <span style={{ color: "#A0522D" }}>Paper Cups</span> for
                Modern Packaging
              </p>
              <p className="mt-3">
                Partner with Radhe Paper Products to turn ideas into impact.
                <br />
                Let’s create eco-friendly, eye-catching designs together.
              </p>

              <div className="row mt-4">
                <div className="col-6">
                  <button
                    className="btn btn-outline-dark w-100"
                    onClick={() => {
                      navigate("/products/all");
                    }}
                  >
                    Shop Now
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-warning w-100"
                    onClick={() => {
                      navigate("/products/all");
                    }}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 m-0 p-0">
            <img src={bgimg} alt="Banner" className="w-100 h-100 object-fit-cover" />
          </div>
        </div>

        {/* Category Carousel */}
        <div className="text-center p-5 bg-white">
          <p className="display-5 fw-semibold">Shop by Category 🛍️</p>
          <p className="w-75 m-auto text-muted">Find the perfect paper cup style for your needs</p>

          <div className="d-flex justify-content-end mb-3 p-3">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() =>
                setIndex(
                  index === 0 ? Math.ceil(CategoryData.length / 6) - 1 : index - 1
                )
              }
            >
              &#8592;
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                setIndex(
                  index === Math.ceil(CategoryData.length / 6) - 1 ? 0 : index + 1
                )
              }
            >
              &#8594;
            </button>
          </div>

          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            indicators={false}
            controls={false}
            touch={true}
            pause={false}
            wrap={true}
          >
            {Array.from({ length: Math.ceil(CategoryData.length / 3) }).map(
              (_, idx) => (
                <Carousel.Item key={idx}>
                  <div className="d-flex justify-content-center gap-4 flex-wrap">
                    {CategoryData.slice(idx * 3, idx * 3 + 6).map((category) => (
                      <div
                        className="bg-white rounded shadow-sm p-3 text-center category-item"
                        key={category.id}
                        style={{
                          cursor: "pointer",
                          transition: "transform 0.3s",
                          width: "150px",
                        }}
                        onClick={() => {
                          navigate(`/products/${category.name}`);
                        }}
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          height={100}
                          width={100}
                        />
                        <p className="mt-2 fw-semibold">{category.name}</p>
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              )
            )}
          </Carousel>
        </div>

        {/* Section: Modern Furniture */}
        <div className="row me-0 p-5 align-items-center bg-light">
          <div className="col-lg-6">
            <p className="display-5 fw-bold">
              Eco <span style={{ color: "#DAA520" }}>Paper Packaging</span>{" "}
              Solutions
            </p>
            <p>
              Our eco-conscious paper cup collection is perfect for businesses
              that care about sustainability and design. Let’s help your brand
              stand out.
            </p>
            <button
              className="btn btn-outline-warning mt-2"
              onClick={() => {
                navigate("/products/all");
              }}
            >
              See More
            </button>
          </div>
          <div className="col-lg-6 p-2">
            <img src={image} alt="Paper Products" className="w-100 rounded" />
          </div>
        </div>

        {/* Final Section: Sale */}
        <div className="row me-0 align-items-center bg-white py-5">
          <div className="col-lg-6 text-center">
            <p className="text-muted">Top Quality Paper Cups</p>
            <p className="display-4 fw-bold text-danger">SALE ENDS IN 6 DAYS!</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                navigate("/products/all");
              }}
            >
              Order Now
            </button>
          </div>
          <div className="col-lg-6">
            <img src={image2} alt="Discount Products" className="w-100 rounded" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
