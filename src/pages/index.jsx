import React from "react";
import CurtainSlider from "../1.curtain-slider/CurtainSlider";
import "../styles/home.scss";

const Index = () => {
  return (
    <div className="main-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">NIKE</span>
            <span className="title-line">LIMITED</span>
            <span className="title-line">EDITION</span>
          </h1>
          <p className="hero-subtitle">Experience the future of sneaker design</p>
          <div className="hero-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </div>
      <CurtainSlider />
      <div className="footer-section">
        <p className="footer-text">Crafted for the extraordinary</p>
      </div>
    </div>
  );
};
export default Index;
