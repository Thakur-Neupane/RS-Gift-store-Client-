import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import bgImage from "../../assets/bg.png";
import patternImage from "../../assets/pattern.png";
import { FaGift } from "react-icons/fa6";

export const AdminLayout = () => {
  return (
    <div className="d-flex shadow-lg">
      <div
        className="left bg-dark text-light p-2 position-relative"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="text-animation mb-3" style={{ color: "#E81135" }}>
          <span>R</span>
          <span>S</span>
          <span>&nbsp;</span>
          <span>G</span>
          <span>i</span>
          <span>f</span>
          <span>t</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>&nbsp;</span>
          <span>S</span>
          <span>t</span>
          <span>o</span>
          <span>r</span>
          <span>e</span>
          <span>&nbsp;</span>
          <span>
            <FaGift />
          </span>
        </div>
        <hr />

        <Sidebar />
      </div>
      <div
        className="right flex-grow-1"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <Header />

        <main
          className="main p-2"
          style={{
            minHeight: "90vh",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};
