import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import fallBackImage from "../../assets/Fallback.png";

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/users/${user._id}`);
  };

  const handleViewClick = (e) => {
    e.stopPropagation(); // Prevents the card click event from being triggered
    navigate(`/users/${user._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevents the card click event from being triggered
    if (window.confirm("Are you sure you want to delete this user?")) {
      onDelete(user._id);
    }
  };

  return (
    <Col xs={12} md={6} lg={3} className="mb-4">
      <Card
        className={`user-card ${
          user.status === "active"
            ? "bg-primary text-white"
            : "bg-danger text-white"
        }`}
        onClick={handleCardClick}
      >
        <Card.Img
          variant="top"
          src={user.photo || fallBackImage}
          className="card-img-top"
          alt="User Avatar"
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div className="card-content">
            <Card.Title className="user-name">{`${user.fName} ${user.lName}`}</Card.Title>
            <Card.Text className="user-email">
              <strong>Email:</strong> {user.email}
            </Card.Text>
          </div>
          <div className="card-actions mt-3 d-flex justify-content-between">
            <Button
              variant="light"
              className="d-flex align-items-center"
              onClick={handleViewClick}
            >
              <FaEye className="me-2" />
              View
            </Button>
            <Button
              variant="light"
              className="d-flex align-items-center"
              onClick={handleDeleteClick}
            >
              <FaTrash className="me-2" />
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    photo: PropTypes.string,
    fName: PropTypes.string.isRequired,
    lName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserCard;
