import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, expiry: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewCouponAction(formData))
      .then(() => {
        toast.success("Coupon created successfully");
        setFormData({
          name: "",
          expiry: new Date(),
          discount: "",
        });
        dispatch(getAllCouponsAction()); // Refresh coupons
      })
      .catch((err) => toast.error(err.message));
  };

  const handleDelete = (couponId) => {
    dispatch(deleteCouponAction(couponId))
      .then(() => {
        toast.success("Coupon deleted successfully");
        dispatch(getAllCouponsAction()); // Refresh coupons
      })
      .catch((err) => toast.error(err.message));
  };

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
                  <p>Discount</p>
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
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter discount percentage"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
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
            <p>Loading...</p>
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
