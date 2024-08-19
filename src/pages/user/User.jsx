import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction } from "../../features/users/userAction";
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

const User = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.userInfo);
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

  const categorizeUsers = (criteria, sortByDate = false) => {
    const categorized = filteredUsers.filter((user) => criteria(user));
    if (sortByDate) {
      return categorized.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return categorized;
  };

  // Function to handle pagination
  const paginate = (array, pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return array.slice(startIndex, startIndex + itemsPerPage);
  };

  const admins = categorizeUsers((user) => user.role === "admin");
  const activeUsers = categorizeUsers((user) => user.status === "active");
  const inactiveUsers = categorizeUsers((user) => user.status === "inactive");

  // Pagination for Admins, Active Users, and Inactive Users
  const paginatedAdmins = paginate(admins, currentPage, usersPerPage);
  const paginatedActiveUsers = paginate(activeUsers, currentPage, usersPerPage);
  const paginatedInactiveUsers = paginate(
    inactiveUsers,
    currentPage,
    usersPerPage
  );

  // Pagination Logic
  const totalPagesAdmins = Math.ceil(admins.length / usersPerPage);
  const totalPagesActive = Math.ceil(activeUsers.length / usersPerPage);
  const totalPagesInactive = Math.ceil(inactiveUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle delete functionality
  const handleDeleteUser = (userId) => {
    // Implement your delete logic here, e.g., dispatch a delete action
    console.log("Deleting user with ID:", userId);
  };

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
                />
              ))
            ) : (
              <p>No admins found.</p>
            )}
          </Row>
          {/* Pagination Controls */}
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
                />
              ))
            ) : (
              <p>No active users found.</p>
            )}
          </Row>
          {/* Pagination Controls */}
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
                />
              ))
            ) : (
              <p>No inactive users found.</p>
            )}
          </Row>
          {/* Pagination Controls */}
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
