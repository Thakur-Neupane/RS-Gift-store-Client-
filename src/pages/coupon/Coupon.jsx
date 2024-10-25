import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
  getAllCouponsAction,
  createNewCouponAction,
  deleteCouponAction,
} from "../../features/coupons/couponAction";
import "react-datepicker/dist/react-datepicker.css";

const CouponForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    expiry: new Date(),
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, expiry: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", expiry: new Date(), discount: "" });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="align-items-center">
        <Col md={3} className="mb-3">
          <Form.Group controlId="formCouponName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter coupon name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Group controlId="formCouponExpiry">
            <Form.Label>Expiry Date</Form.Label>
            <DatePicker
              selected={formData.expiry}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              className="form-control"
              required
            />
          </Form.Group>
        </Col>
        <Col md={2} className="mb-3">
          <Form.Group controlId="formCouponDiscount">
            <Form.Label>Discount (%)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter discount percentage"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>
        </Col>
        <Col md={3} className="mb-3">
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Create Coupon"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const CouponList = ({ coupons, onDelete }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>Expiry Date</th>
        <th>Discount</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {coupons.map((coupon) => (
        <tr key={coupon._id}>
          <td>{coupon.name}</td>
          <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
          <td>{coupon.discount}%</td>
          <td>
            <Button variant="danger" onClick={() => onDelete(coupon._id)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const Coupon = () => {
  const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state) => state.couponInfo);

  useEffect(() => {
    dispatch(getAllCouponsAction());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load coupons: " + error);
    }
  }, [error]);

  const handleCreateCoupon = async (formData) => {
    try {
      await dispatch(createNewCouponAction(formData));
      toast.success("Coupon created successfully");
      dispatch(getAllCouponsAction());
    } catch (err) {
      toast.error("Failed to create coupon: " + err.message);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      await dispatch(deleteCouponAction(couponId));
      toast.success("Coupon deleted successfully");
      dispatch(getAllCouponsAction());
    } catch (err) {
      toast.error("Failed to delete coupon: " + err.message);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <h4 className="mb-4">Create Coupon</h4>
          <CouponForm onSubmit={handleCreateCoupon} loading={loading} />

          <h4 className="mb-4">Coupons List</h4>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <CouponList coupons={coupons} onDelete={handleDeleteCoupon} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Coupon;
