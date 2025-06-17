import React from "react";
import bgimg from "../images/Purav.png";

const About = () => {
  return (
    <div className="container-fluid py-5 bg-light" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div className="row">
        {/* Left Image Column */}
        <div
          className="col-md-6 d-flex justify-content-center align-items-center"
          style={{ padding: "20px" }}
        >
          <img
            src={bgimg}
            alt="Radhe Dispoworld"
            className="rounded"
            style={{
              maxWidth: "100%",
              height: "auto",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          />
        </div>

        {/* Right Text Column */}
        <div className="col-md-6" style={{ padding: "20px" }}>
          <h2 className="display-5 mb-4" style={{ color: "#2c3e50", fontWeight: "700" }}>
            Radhe Dispoworld
          </h2>
          <p className="fs-5" style={{ lineHeight: "1.8", color: "#34495e", whiteSpace: "pre-line" }}>
            • Radhe Dispoworld is a since 2018 Ahmedabad (Gujarat) based manufacturing company.
            {"\n"}We are manufacturing paper cups in various sizes and dimensions.
            {"\n"}We also customize our products as per client’s requirements.
            {"\n\n"}
            📍 21, Adarsh Gold Industrial Estate, Near CISF Headquarter,
            {"\n"}Odhav, Ahmedabad, Gujarat 382415, India
            {"\n\n"}
            📧 Email: radhedispoworld@gmail.com
            {"\n"}📞 Phone: 8980005230, 8141805230, 9904445230
            {"\n"}📞 Alternate: +91 7946011147
          </p>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="row mt-4">
        <div className="col-12">
          <h4 className="text-center mb-3" style={{ color: "#2c3e50" }}>Our Location</h4>
          <div style={{ border: "2px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
            <iframe
              title="Radhe Dispoworld Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.168961539485!2d72.7755185752313!3d23.005335379167222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e877fb7a04361%3A0x4e2376226ab352dd!2sRADHE%20PEPAR%20CUP%20(RADHE%20DISPOWORLD)!5e0!3m2!1sen!2sin!4v1718385703522!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
