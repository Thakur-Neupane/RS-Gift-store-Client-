import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProductAction } from "../../features/products/productAction";
import { getCategoryAction } from "../../features/categories/catAction";
import { getSubCategoryAction } from "../../features/subcategories/subCatAction";

const ProductView = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  // Retrieve product, categories, and subcategories from Redux store
  const product = useSelector((state) => state.productInfo.product);
  const loading = useSelector((state) => state.productInfo.loading);
  const errorFromRedux = useSelector((state) => state.productInfo.error);
  const categories = useSelector((state) => state.catInfo.cats);
  const subCategories = useSelector((state) => state.subCatInfo.subCats);

  const [subCatMap, setSubCatMap] = useState({});

  useEffect(() => {
    dispatch(getOneProductAction(_id));
    dispatch(getCategoryAction());
    dispatch(getSubCategoryAction());
  }, [_id, dispatch]);

  useEffect(() => {
    if (errorFromRedux) {
      setError(errorFromRedux);
    }
  }, [errorFromRedux]);

  useEffect(() => {
    const map = subCategories.reduce((acc, subCat) => {
      acc[subCat._id] = subCat.title;
      return acc;
    }, {});
    setSubCatMap(map);
  }, [subCategories]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  // Helper functions to get category and subcategory names
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.title : "N/A";
  };

  const getSubCategoryNames = (subCategoryIds) => {
    const names = subCategoryIds.map((id) => subCatMap[id] || "N/A").join(", ");
    return names || "N/A";
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Product Details</h2>
      {product ? (
        <Row>
          <Col md={6}>
            <Carousel>
              {product.images && product.images.length > 0 ? (
                product.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img.url} // Ensure img.url is the correct path
                      alt={`Slide ${index}`}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/path/to/default/image.jpg" // Add a default image path if no images available
                    alt="No Image"
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </Col>
          <Col md={6}>
            <h3>{product.name}</h3>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            {product.salesPrice && (
              <p>
                <strong>Sales Price:</strong> ${product.salesPrice}
              </p>
            )}
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Category:</strong> {getCategoryName(product.category)}
            </p>
            <p>
              <strong>Sub-Category:</strong>{" "}
              {getSubCategoryNames(product.subCategories)}
            </p>
            <p>
              <strong>Quantity:</strong> {product.qty}
            </p>
            <p>
              <strong>Shipping:</strong> {product.shipping}
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Sales Period:</strong>{" "}
              {product.salesStart
                ? `${new Date(
                    product.salesStart
                  ).toLocaleDateString()} - ${new Date(
                    product.salesEnd
                  ).toLocaleDateString()}`
                : "N/A"}
            </p>
          </Col>
        </Row>
      ) : (
        <Alert variant="info">Product not found</Alert>
      )}
    </Container>
  );
};

export default ProductView;
