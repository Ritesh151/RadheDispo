import React, { useContext } from "react";
import { myContext } from "../App";
import service from "../services/constant";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import SuccessToast from "../atom-molecules/utils";

function Favorite() {
  const { showToast, toastComponent } = SuccessToast();
  const { favoriteProducts, setFavoriteProducts } = useContext(myContext);
  const navigate = useNavigate();
  const viewFavorite = (product) => {
    navigate(`/products/single-product/${product._id}`);
  };
  const removeFavorite = (product) => {
    const index = favoriteProducts.findIndex((item) => item.id === product.id);
    if (index > -1) {
      favoriteProducts.splice(index, 1);
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProducts)
      );
    }
    showToast("Product removed from favorite list", "error");
    setFavoriteProducts([...favoriteProducts]);
  };
  return (
    <>
      {toastComponent}
      <div className="bg-light p-3">
        <p className="display-6 text-center">
          Your <span style={{ color: "#8B9E70" }}>Favorite</span> Products
        </p>
        <div className="container mt-4">
          {favoriteProducts?.length > 0 ? (
            <>
              <div
                className="table-responsive"
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  position: "relative",
                  borderRadius: 5,
                }}
              >
                <table className="table table-bordered text-center">
                  <thead
                    className="table-dark"
                    style={{ position: "sticky", top: 0, zIndex: 100 }}
                  >
                    <tr>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favoriteProducts?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={`${service.API_URL}${item.productImage}`}
                            alt=""
                            height={100}
                            width={100}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>₹{item.price}</td>
                        <td>
                          <FaRegEye
                            style={{ cursor: "pointer" }}
                            size={20}
                            onClick={() => {
                              viewFavorite(item);
                            }}
                          />{" "}
                          &nbsp;{" "}
                          <MdDelete
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              removeFavorite(item);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <p className="fs-5 text-center">
                Oops! No Product Added To Your Favorite.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorite;
