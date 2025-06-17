import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ApiServices } from "../services/apiServices";
import { GET_PRODUCT_BY_ID } from "../services/url_helper";
import service from "../services/constant";
import { myContext } from "../App";
import SuccessToast from "../atom-molecules/utils";

function SingleProduct() {
  const { showToast, toastComponent } = SuccessToast();
  const { setCart } = useContext(myContext);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [quantityCount, setQuantityCount] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [zoom, setZoom] = useState({ visible: false, x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const minQuantity = 1;
  const maxQuantity = 10;

  const getDataById = async () => {
    try {
      const updatedURI = `${GET_PRODUCT_BY_ID}/${productId}`;
      const response = await ApiServices.callServiceGet(updatedURI);
      if (response.response === true) {
        setData(response.data);
        setMainImage(response.data?.productImage || "");
      } else {
        throw new Error("Failed to fetch product data.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataById();
    const checkData = JSON.parse(localStorage.getItem("orderData"));
    if (checkData && checkData.length > 0) {
      const productIndex = checkData.findIndex(
        (item) => item._id === productId
      );
      if (productIndex !== -1) {
        setQuantityCount(checkData[productIndex].quantity);
      }
    }
  }, [productId]);

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ visible: true, x, y });
  };

  const handleMouseLeave = () => {
    setZoom({ visible: false, x: 0, y: 0 });
  };

  const handleCart = () => {
    const updatedData = { ...data, quantity: quantityCount };
    const orderData = JSON.parse(localStorage.getItem("orderData")) || [];
    const existingProductIndex = orderData.findIndex(
      (item) => item._id === data._id
    );
    if (existingProductIndex !== -1) {
      orderData[existingProductIndex].quantity = quantityCount;
      showToast("Details Updated!");
    } else {
      orderData.push(updatedData);
      showToast("Product added to cart!");
    }
    setCart(orderData);
    localStorage.setItem("orderData", JSON.stringify(orderData));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <>
      {toastComponent}

      <div className="bg-light">
        <div className="row me-0 p-3">
          <div className="col-md-6 col-sm-12">
            <div className="row me-0">
              <div className="col-4 d-flex flex-md-column align-items-end flex-wrap">
                {data?.otherImages?.map((item, index) => (
                  <img
                    src={`${service.API_URL}${item}`}
                    alt={`Thumbnail-${index}`}
                    key={index}
                    onClick={() => handleThumbnailClick(item)}
                    style={{
                      border:
                        mainImage === item
                          ? "2px solid black"
                          : "1px solid #ddd",
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      cursor: "pointer",
                      marginBottom: "10px",
                      marginRight: "10px",
                    }}
                  />
                ))}
              </div>

              <div className="col-8">
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                    cursor: "zoom-in",
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={`${service.API_URL}${mainImage}`}
                    alt="Main Product"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                  {zoom.visible && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${service.API_URL}${mainImage})`,
                        backgroundSize: "200%",
                        backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                        pointerEvents: "none",
                        transform: "scale(1.5)",
                        transformOrigin: "center",
                        zIndex: 10,
                        opacity: 0.9,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <p className="display-6">{data.name}</p>
            <p className="fs-5">
              <span className="text-secondary">Price:</span> ₹{data.price}
            </p>
            <p>
              <span className="text-secondary">Measurements:</span>{" "}
              {data.measurements}
            </p>
            <p>
              <span className="text-secondary">Material Used:</span>{" "}
              {data.materialUsed}
            </p>
            <p>{data.description}</p>
            <div className="row me-0 w-25 mb-3 ms-1 border border-1 border-dark text-center">
              <div
                className={`col-4 border border-1 border-dark p-2 fs-6 ${
                  quantityCount <= minQuantity ? "text-muted" : ""
                }`}
                style={{
                  cursor:
                    quantityCount > minQuantity ? "pointer" : "not-allowed",
                }}
                onClick={() =>
                  quantityCount > minQuantity &&
                  setQuantityCount(quantityCount - 1)
                }
              >
                -
              </div>

              <div className="col-4 border border-1 border-dark p-2 fs-6">
                {quantityCount}
              </div>

              <div
                className={`col-4 border border-1 border-dark p-2 fs-6 ${
                  quantityCount >= maxQuantity ? "text-muted" : ""
                }`}
                style={{
                  cursor:
                    quantityCount < maxQuantity ? "pointer" : "not-allowed",
                }}
                onClick={() =>
                  quantityCount < maxQuantity &&
                  setQuantityCount(quantityCount + 1)
                }
              >
                +
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn btn-dark" onClick={handleCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 mb-0">
          <p className="text-secondary">Other Description:</p>
          <p>{data.otherDescription}</p>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
