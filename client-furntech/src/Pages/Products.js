import React, { useContext, useEffect, useState } from "react";
import { ApiServices } from "../services/apiServices";
import { GET_ALL_PRODUCTS } from "../services/url_helper";
import { useNavigate, useParams } from "react-router";
import service from "../services/constant";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import CategoryData from "./CategoryData";
import { myContext } from "../App";
import SuccessToast from "../atom-molecules/utils";

const Products = () => {
  const { showToast, toastComponent } = SuccessToast();
  const { cart, setCart,favoriteProducts,setFavoriteProducts } = useContext(myContext);  // Get cart state from context
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [categorySelected, setCategorySelected] = useState(category === "all" ? "" : category || "");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const result = await ApiServices.callServiceGet(GET_ALL_PRODUCTS);
    if (result?.response === true) {
      setData(result?.data);
    }
  };

  const handleSinglePage = (id) => {
    navigate(`/products/single-product/${id}`);
  };

  // Add or remove item from cart
  const toggleCart = (product) => {
    const updatedProduct = {...product,quantity:1}
    const isInCart = cart.some((item) => item._id === product._id);

    if (isInCart) {
      // Remove from cart
      setCart(cart.filter((item) => item._id !== product._id));
      showToast(`${product.name} Removed from cart!`,"error");
    } else {
      // Add to cart
      setCart([...cart, updatedProduct]);
      showToast(`${product.name} Added to cart!`)
    }
  };

  const toggleFavoriteProduct = (product) => {
    const isInFavorite = favoriteProducts.some((item) => item._id === product._id);
    if (isInFavorite) {
      // Remove from cart
      setFavoriteProducts(favoriteProducts.filter((item) => item._id !== product._id));
      showToast(`${product.name} Removed from Favorite!`,"error");
    } else {
      // Add to cart
      setFavoriteProducts([...favoriteProducts, product]);
      showToast(`${product.name} Added to Favorite!`)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setCategorySelected(category === "all" ? "" : category || "");
  }, [category]);

  useEffect(() => {
    if (categorySelected) {
      const filteredData = data.filter((item) => item?.category === categorySelected);
      setFilteredData(filteredData);
    } else {
      setFilteredData(data);
    }
  }, [categorySelected, data]);

  return (<>
  {toastComponent}
    <div className="p-3 bg-light">
      <p className="display-6 text-center">{categorySelected ? categorySelected : "All"} Products</p>
      
      <div className="category-container">
        <div className="category-buttons">
          <button
            className={`category-btn ${!categorySelected ? 'selected' : ''}`}
            onClick={() => setCategorySelected("")}
          >
            All
          </button>
          {CategoryData?.map((item, index) => (
            <button
              key={index}
              className={`category-btn ${categorySelected === item?.name ? 'selected' : ''}`}
              onClick={() => setCategorySelected(item?.name)}
            >
              {item?.name}
            </button>
          ))}
        </div>
      </div>

      <div className="row row-cols-2 row-cols-md-4 g-4">
        {filteredData?.map((item, index) => {
          const isInCart = cart.some((cartItem) => cartItem._id === item._id);
          const isInFavorite = favoriteProducts.some((cartItem) => cartItem._id === item._id);

          return (
            <div className="col" key={index}>
              <div className="card shadow h-100" style={{ cursor: "pointer" }} onClick={() => handleSinglePage(item?._id)}>
                <img
                  src={`${service.API_URL}${item.productImage}`}
                  className="card-img-top"
                  alt="No image found"
                  style={{ minHeight: "200px", maxHeight: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item?.name}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text">₹{item?.price}</p>
                    <div>
                      <FaHeart
                        className={isInFavorite ? "text-danger" : "text-secondary"}
                        style={{ cursor: "pointer", height: 20, width: 20 }}
                        onClick={(e)=>{
                          e.stopPropagation(); 
                          toggleFavoriteProduct(item)
                        }}
                      />
                      &nbsp; &nbsp;
                      <FaShoppingCart
                        className={isInCart ? "text-primary" : "text-secondary"}
                        style={{ cursor: "pointer", height: 20, width: 20 }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          toggleCart(item);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Products;
