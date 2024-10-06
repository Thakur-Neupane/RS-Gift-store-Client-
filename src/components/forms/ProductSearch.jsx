import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const ProductSearch = ({
  keyword,
  setKeyword,
  categoryFilter,
  setCategoryFilter,
  subCategoryFilter,
  setSubCategoryFilter,
  categories,
  subCategories,
  type,
  disableSubCategory,
}) => {
  return (
    <Row className="my-3">
      {/* Search input for the product name */}
      <Col md={4} className="mb-3">
        <Form.Group controlId="productSearch">
          <Form.Control
            type="text"
            placeholder={`Search ${type}`}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>
      </Col>

      {/* Dropdown for category selection */}
      <Col md={4} className="mb-3">
        <Form.Group controlId="categorySelect">
          <Form.Control
            as="select"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setSubCategoryFilter(""); // Reset subcategory when category changes
            }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>

      {/* Dropdown for subcategory selection */}
      <Col md={4} className="mb-3">
        <Form.Group controlId="subCategorySelect">
          <Form.Control
            as="select"
            value={subCategoryFilter}
            onChange={(e) => setSubCategoryFilter(e.target.value)}
            disabled={disableSubCategory}
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((subCat) => (
              <option key={subCat._id} value={subCat._id}>
                {subCat.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default ProductSearch;
