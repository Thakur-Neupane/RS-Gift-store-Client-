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
  type = "Product", // Default value
  disableSubCategory,
}) => {
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setSubCategoryFilter(""); // Reset subcategory filter when category changes
  };

  return (
    <Row className="my-3">
      <Col md={4} className="mb-3">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder={`Search ${type}`}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label={`Search ${type}`}
          />
        </Form.Group>
      </Col>
      <Col md={4} className="mb-3">
        <Form.Group>
          <Form.Control
            as="select"
            value={categoryFilter}
            onChange={handleCategoryChange}
            aria-label="Select Category"
          >
            <option value="">Select Category</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={4} className="mb-3">
        <Form.Group>
          <Form.Control
            as="select"
            value={subCategoryFilter}
            onChange={(e) => setSubCategoryFilter(e.target.value)}
            disabled={disableSubCategory}
            aria-label="Select Subcategory"
          >
            <option value="">Select Subcategory</option>
            {subCategories.length > 0 ? (
              subCategories.map((subCat) => (
                <option key={subCat._id} value={subCat._id}>
                  {subCat.title}
                </option>
              ))
            ) : (
              <option disabled>No subcategories available</option>
            )}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default ProductSearch;
