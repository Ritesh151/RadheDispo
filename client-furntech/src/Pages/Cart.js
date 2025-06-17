import React, { useContext, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { myContext } from "../App";
import service from "../services/constant";
import { useNavigate } from "react-router";
import SuccessToast from "../atom-molecules/utils";

function Cart() {
  const { showToast, toastComponent } = SuccessToast();
  const { cart, setCart } = useContext(myContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Manage modal state

  const removeFromCart = (id) => {
    const updatedData = cart.filter((product) => product._id !== id);
    setCart(updatedData);
    localStorage.setItem("orderData", JSON.stringify(updatedData));
    showToast("Product Removed!");
  };

  const handleProceedToCheckout = () => {
    const userDetails = localStorage.getItem("userDetails");

    if (!userDetails) {
      setShowModal(true); // Open modal if user is not logged in
    } else {
      navigate("/shipping");
    }
  };

  const SubTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {toastComponent}
      <div className="p-3">
        <p className="display-5 text-center p-2">Cart</p>
        <div className="row w-100 p-3 m-auto">
          <div className="col-sm-8">
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
          </div>
          <div className="col-sm-4">
            <div className="border p-2 rounded">
              <h5 className="bg-light w-100 p-2">Cart Totals</h5>
              <div className="d-flex justify-content-between p-2">
                <span>Subtotal</span>
                <span>₹{SubTotal}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between p-2">
                <span>Total</span>
                <span>₹{SubTotal}</span>
              </div>
              <hr />
              <button className="btn btn-dark w-100" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Note</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">You Are Not Signed In!</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
