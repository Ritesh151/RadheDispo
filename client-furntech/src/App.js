import React, { createContext, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "@fontsource/nunito";
import Lazyloading from "./atom-molecules/Lazyloading.js";
export const myContext = createContext();
const Home = React.lazy(() => import("./Pages/Home.js"));
const Products = React.lazy(() => import("./Pages/Products.js"));
const CustomizePage = React.lazy(() => import("./Pages/CustomizePage.js"));
const About = React.lazy(() => import("./Pages/About.js"));
const SingleProduct = React.lazy(() => import("./Pages/SingleProduct.js"));
const Navbar = React.lazy(() => import("./atom-molecules/Navbar.js"));
const Footer = React.lazy(() => import("./Pages/Footer.js"));
const Cart = React.lazy(() => import("./Pages/Cart"));
const Login = React.lazy(() => import("./Pages/Login"));
const Register = React.lazy(() => import("./Pages/Register"));
const Shipping = React.lazy(() => import("./Pages/Shipping"));
const MyInfo = React.lazy(() => import("./Pages/Myinfo.js"));
const Orderstatus = React.lazy(() => import("./Pages/Orderstatus.js"));
const Notfoundpage = React.lazy(() => import("./Pages/Notfoundpage.js"));
const Favorite = React.lazy(() => import("./Pages/Favorite.js"));
// const View360 = React.lazy(() => import("./Pages/View360.js")) ;

function App() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("orderData");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [favoriteProducts, setFavoriteProducts] = useState(() => {
    const storedFavorites = localStorage.getItem("favoriteProducts");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  useEffect(() => {
    localStorage.setItem("orderData", JSON.stringify(cart));
    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
  }, [cart, favoriteProducts]);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Lazyloading />}>
          <myContext.Provider
            value={{ cart, setCart, favoriteProducts, setFavoriteProducts }}
          >
            <Navbar />
            <Routes>
              <Route path="*" element={<Notfoundpage />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/products/:category" element={<Products />}></Route>
              <Route path="/about-us" element={<About />}></Route>
              <Route path="/customize" element={<CustomizePage />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/shipping" element={<Shipping />}></Route>
              <Route path="/favorite" element={<Favorite />}></Route>
              <Route path="/my-info" element={<MyInfo />}></Route>
              <Route path="/order-status" element={<Orderstatus />}></Route>
              {/* <Route path="/view360" element={<View360 />} /> */}
              <Route
                path="/products/single-product/:productId"
                element={<SingleProduct />}
              ></Route>
            </Routes>
            <Footer />
          </myContext.Provider>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
