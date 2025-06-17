import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate()
  return (
    <>
      <div className="bgimg2">
        <div className="row me-0 p-5 layer">
          <div className="col-lg-4">
            <p className="display-6 fw-bold">
               <span style={{ color: "#2E3A59" }}>R</span>adhe 
            <span style={{ color: "#2E3A59" }}>D</span>ispo
            <span style={{ color: "#2E3A59" }}>W</span>orld
            </p>
            <p>
              <FaPhoneAlt /> +91 8980005230
            </p>
            <p>
              <FaPhoneAlt /> +91 8141805230
            </p>
            <p>
              <FaPhoneAlt /> +91 9904445230
            </p>
            <p>
              <IoIosMail /> Radhedispoworld@gmail.com
            </p>
          </div>
          <div className="col-lg-4">
            <p className="display-6 fw-bold">Our Links</p>
            <p style={{cursor:"pointer"}} onClick={()=>{navigate('/')}}>&nbsp;Home</p>
            <p style={{cursor:"pointer"}} onClick={()=>{navigate('/products/all')}}>&nbsp;Products</p>
            <p style={{cursor:"pointer"}} onClick={()=>{navigate('/')}}>&nbsp;Services</p>
            <p style={{cursor:"pointer"}} onClick={()=>{navigate('/about-us')}}>&nbsp;About Us</p>
          </div>
          <div className="col-lg-4">
            <p className="display-6 fw-bold">Our Services</p>
            <p>&nbsp;Custom Paper Cup Printing</p>
            <p>&nbsp;Eco-Friendly Paper Cup Manufacturing</p>
            <p>&nbsp;Bulk Order Supply & Distribution</p>
            <p>&nbsp;Brand Logo & Packaging Design</p>
        </div>

        </div>
        <div className="text-center p-3 fw-bold" style={{color:"black"}}>
           Copyright © 2025. Made By Ritesh Gajjar. All rights reserved.
        </div>
      </div>
    </>
  );
}

export default Footer;
