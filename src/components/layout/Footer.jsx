import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-info text-light py-4">
      <div className="container text-center">
        <h5 className="mb-3">Admin CMS for RS Gifting Store</h5>
        <p className="mb-0">Admin v3.6</p>
        <div className="mt-3">
          <a href="#" className="text-light mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
