import React, { useState, useEffect, useCallback } from "react";
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

const Coupon = () => {
  const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state) => state.couponInfo);

  const [formData, setFormData] = useState({
    name: "",
    expiry: new Date(),
    discount: "",
  });

  useEffect(() => {
    dispatch(getAllCouponsAction());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDateChange = useCallback((date) => {
    setFormData((prev) => ({ ...prev, expiry: date }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (formData.discount < 0 || formData.discount > 100) {
        toast.error("Discount must be between 0 and 100");
        return;
      }
      try {
        await dispatch(createNewCouponAction(formData));
        toast.success("Coupon created successfully");
        setFormData({ name: "", expiry: new Date(), discount: "" });
        dispatch(getAllCouponsAction());
      } catch (err) {
        toast.error(err.message);
      }
    },
    [dispatch, formData]
  );

  const handleDelete = useCallback(
    async (couponId) => {
      if (window.confirm("Are you sure you want to delete this coupon?")) {
        try {
          await dispatch(deleteCouponAction(couponId));
          toast.success("Coupon deleted successfully");
          dispatch(getAllCouponsAction());
        } catch (err) {
          toast.error(err.message);
        }
      }
    },
    [dispatch]
  );

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <h4 className="mb-4">Create Coupon</h4>
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
                    max="100"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Button variant="primary" type="submit" className="w-100">
                  Create Coupon
                </Button>
              </Col>
            </Row>
          </Form>

          <h4 className="mb-4">Coupons List</h4>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
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
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(coupon._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Coupon;
