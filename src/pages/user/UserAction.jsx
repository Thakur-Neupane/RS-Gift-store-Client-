import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserByIdAction,
  updateUserStatusAction,
  updateUserRoleAction,
  deleteUserAction,
} from "../../features/users/userAction";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import defaultImage from "../../assets/Fallback.png";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.user);
  const status = useSelector((state) => state.userInfo.status);
  const [isActive, setIsActive] = useState(user.status === "active");
  const [isAdmin, setIsAdmin] = useState(user.role === "admin");

  useEffect(() => {
    if (id) {
      dispatch(fetchUserByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setIsActive(user.status === "active");
      setIsAdmin(user.role === "admin");
    }
  }, [user]);

  const handleStatusChange = async () => {
    const newStatus = isActive ? "inactive" : "active";
    try {
      await dispatch(updateUserStatusAction(id, newStatus));
      toast.success(`User status updated to ${newStatus}`);
      setIsActive(!isActive);
    } catch (error) {
      toast.error("Failed to update user status.");
    }
  };

  const handleRoleChange = async () => {
    const newRole = isAdmin ? "user" : "admin";
    try {
      await dispatch(updateUserRoleAction(id, newRole));
      toast.success(`User role updated to ${newRole}`);
      setIsAdmin(!isAdmin);
    } catch (error) {
      toast.error("Failed to update user role.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUserAction(id));
        toast.success("User deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete user.");
      }
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load user details.</p>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <div className="text-center mb-3">
                {/* Display user photo */}
                <img
                  src={user.image || defaultImage}
                  alt="User Photo"
                  className="img-fluid rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <Card.Title className="text-center">User Details</Card.Title>
              <Card.Text>
                <strong>First Name:</strong> {user.fName || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Last Name:</strong> {user.lName || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.email || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Phone:</strong> {user.phone || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong>
                <Form.Check
                  type="switch"
                  id="status-switch"
                  label={isActive ? "Active" : "Inactive"}
                  checked={isActive}
                  onChange={handleStatusChange}
                />
              </Card.Text>
              <Card.Text>
                <strong>Role:</strong>
                <Form.Check
                  type="switch"
                  id="role-switch"
                  label={isAdmin ? "Admin" : "User"}
                  checked={isAdmin}
                  onChange={handleRoleChange}
                />
              </Card.Text>
              <Card.Text>
                <strong>Created At:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                <strong>Updated At:</strong>{" "}
                {new Date(user.updatedAt).toLocaleDateString()}
              </Card.Text>

              <div className="text-center mt-4">
                <Button variant="danger" onClick={handleDelete}>
                  <FaTrash /> Delete User
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
