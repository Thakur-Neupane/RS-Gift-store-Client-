import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsersAction,
  deleteUserAction, // Import the delete action
} from "../../features/users/userAction";
import UserCard from "../../components/cards/UserCard";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Pagination,
  Badge,
} from "react-bootstrap";
import { toast } from "react-toastify";

const User = () => {
  const dispatch = useDispatch();
  const { userList, status } = useSelector((state) => state.userInfo);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(userList);
  }, [userList]);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterUsers(term);
  };

  const filterUsers = (term) => {
    const filtered = userList.filter(
      (user) =>
        user.fName.toLowerCase().includes(term) ||
        user.lName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const categorizeUsers = (criteria) => {
    return filteredUsers.filter((user) => criteria(user));
  };

  const paginate = (array, pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return array.slice(startIndex, startIndex + itemsPerPage);
  };

  const admins = categorizeUsers((user) => user.role === "admin");
  const activeUsers = categorizeUsers(
    (user) => user.status === "active" && user.role !== "admin"
  );
  const inactiveUsers = categorizeUsers(
    (user) => user.status === "inactive" && user.role !== "admin"
  );

  const paginatedAdmins = paginate(admins, currentPage, usersPerPage);
  const paginatedActiveUsers = paginate(activeUsers, currentPage, usersPerPage);
  const paginatedInactiveUsers = paginate(
    inactiveUsers,
    currentPage,
    usersPerPage
  );

  const totalPagesAdmins = Math.ceil(admins.length / usersPerPage);
  const totalPagesActive = Math.ceil(activeUsers.length / usersPerPage);
  const totalPagesInactive = Math.ceil(inactiveUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUserAction(userId));
        toast.success("User deleted successfully.");
        // Optionally, refetch users or update the filtered list
        dispatch(fetchAllUsersAction()); // Re-fetch users to update the list
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
      <Row className="mb-4">
        <Col xs={12} className="mb-3">
          <h2>
            Users Found <Badge bg="secondary">{filteredUsers.length}</Badge>
          </h2>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="primary">Search</Button>
          </InputGroup>
        </Col>
        <Col xs={12} className="mt-4">
          <h3>
            Admins <Badge bg="info">{admins.length}</Badge>
          </h3>
          <Row>
            {paginatedAdmins.length > 0 ? (
              paginatedAdmins.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onDelete={handleDeleteUser}
                  style={{ backgroundColor: "lightblue" }} // Different color for Admins
                />
              ))
            ) : (
              <p>No admins found.</p>
            )}
          </Row>
          <Row className="mt-4">
            <Col xs={12}>
              <Pagination>
                {Array.from({ length: totalPagesAdmins }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="mt-4">
          <h3>
            Active Users <Badge bg="success">{activeUsers.length}</Badge>
          </h3>
          <Row>
            {paginatedActiveUsers.length > 0 ? (
              paginatedActiveUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onDelete={handleDeleteUser}
                  style={{ backgroundColor: "lightgreen" }} // Different color for Active Users
                />
              ))
            ) : (
              <p>No active users found.</p>
            )}
          </Row>
          <Row className="mt-4">
            <Col xs={12}>
              <Pagination>
                {Array.from({ length: totalPagesActive }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="mt-4">
          <h3>
            Inactive Users <Badge bg="warning">{inactiveUsers.length}</Badge>
          </h3>
          <Row>
            {paginatedInactiveUsers.length > 0 ? (
              paginatedInactiveUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onDelete={handleDeleteUser}
                  style={{ backgroundColor: "lightcoral" }} // Different color for Inactive Users
                />
              ))
            ) : (
              <p>No inactive users found.</p>
            )}
          </Row>
          <Row className="mt-4">
            <Col xs={12}>
              <Pagination>
                {Array.from({ length: totalPagesInactive }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default User;
