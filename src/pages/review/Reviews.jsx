import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReviewsAction,
  updateReviewAction,
  deleteReviewAction,
} from "../../features/reviews/reviewAction";
import { getOneProductAction } from "../../features/products/productAction";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import { toast } from "react-toastify";

const AdminReviewPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviewInfo.allReviews || []);

  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [ratingRange, setRatingRange] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 15;

  useEffect(() => {
    dispatch(getReviewsAction(true)); // Fetch all reviews for admin
  }, [dispatch]);

  useEffect(() => {
    setFilteredReviews(filterReviews(reviews));
  }, [reviews, ratingRange, statusFilter]);

  const filterReviews = (reviews) => {
    return reviews.filter((review) => {
      let matchesRating = true;
      let matchesStatus = true;

      if (ratingRange !== "all") {
        const [min, max] = ratingRange.split("-").map(Number);
        matchesRating = review.rating >= min && review.rating <= max;
      }

      if (statusFilter !== "all") {
        matchesStatus = review.status === statusFilter;
      }

      return matchesRating && matchesStatus;
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "ratingRange") setRatingRange(value);
    if (name === "status") setStatusFilter(value);
  };

  const handleToggleStatus = async (review) => {
    const updatedReview = {
      ...review,
      status: review.status === "active" ? "inactive" : "active",
    };
    try {
      await dispatch(updateReviewAction(updatedReview));
    } catch (error) {
      toast.error("Error updating review status: " + error.message);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await dispatch(deleteReviewAction(reviewId));
      } catch (error) {
        toast.error("Error deleting review: " + error.message);
      }
    }
  };

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col xs={12} md={6} className="mb-3">
          <h2>Manage Reviews</h2>
        </Col>
        <Col xs={12} md={6} className="mb-3">
          <InputGroup className="mb-3">
            <Form.Control
              as="select"
              name="ratingRange"
              value={ratingRange}
              onChange={handleFilterChange}
              className="me-2" // Add margin to the right
            >
              <option value="all">All Ratings</option>
              <option value="1-2">1 - 2</option>
              <option value="2-3">2 - 3</option>
              <option value="3-4">3 - 4</option>
              <option value="4-5">4 - 5</option>
            </Form.Control>
            <Form.Control
              as="select"
              name="status"
              value={statusFilter}
              onChange={handleFilterChange}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Control>
          </InputGroup>
        </Col>
        <Col xs={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Product</th>
                <th>Title</th>
                <th>Rating</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review) => {
                return (
                  <tr key={review._id}>
                    <td>{review.userName}</td>
                    <td>{review.productName || "Loading..."}</td>
                    <td>{review.title}</td>
                    <td>{review.rating}</td>
                    <td>{review.description}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        id={`switch-${review._id}`}
                        checked={review.status === "active"}
                        onChange={() => handleToggleStatus(review)}
                        label={
                          review.status === "active" ? "Active" : "Inactive"
                        }
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        className="ms-2"
                        onClick={() => handleDelete(review._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {totalPages > 1 && (
            <Pagination>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminReviewPage;
