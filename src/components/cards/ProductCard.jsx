// src/components/ProductCard.js

import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// Custom styles for fixed image size and card dimensions
const cardImgStyle = {
  height: "200px",
  objectFit: "cover",
};

const cardStyle = {
  height: "100%", // Ensures that the card always takes up full height
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const ProductCard = ({ product, onDelete }) => {
  return (
    <Card className="mb-4 shadow-sm" style={cardStyle}>
      <Card.Img variant="top" src={product.thumbnail} style={cardImgStyle} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> ${product.price}
          <br />
          <strong>SKU:</strong> {product.sku}
          <br />
          <strong>Brand:</strong> {product.brand}
          <br />
          <strong>Color:</strong> {product.color}
          <br />
          <strong>Description:</strong> {truncateText(product.description, 150)}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Link
            to={`/admin/products/view/${product._id}`}
            className="btn btn-info"
          >
            <FaEye /> View
          </Link>
          <Link
            to={`/admin/products/edit/${product._id}`}
            className="btn btn-primary"
          >
            <FaEdit /> Edit
          </Link>
          <Button variant="danger" onClick={() => onDelete(product._id)}>
            <FaTrash /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
