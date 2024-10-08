import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Button } from "react-bootstrap";

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
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setSubCategoryFilter(""); // Reset subcategory filter when category changes
  };

  const handleClearFilters = () => {
    setKeyword("");
    setCategoryFilter("");
    setSubCategoryFilter("");
  };

  return (
    <div className="my-3">
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Search {type}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Search ${type}`}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={categoryFilter}
              onChange={handleCategoryChange}
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
        <Col md={4}>
          <Form.Group>
            <Form.Label>Subcategory</Form.Label>
            <Form.Control
              as="select"
              value={subCategoryFilter}
              onChange={(e) => setSubCategoryFilter(e.target.value)}
              disabled={disableSubCategory || !categoryFilter}
            >
              <option value="">Select Subcategory</option>
              {subCategories
                .filter((subCat) => subCat.categoryId === categoryFilter) // Adjust based on your data structure
                .map((subCat) => (
                  <option key={subCat._id} value={subCat._id}>
                    {subCat.title}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="secondary" onClick={handleClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

ProductSearch.propTypes = {
  keyword: PropTypes.string.isRequired,
  setKeyword: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
  subCategoryFilter: PropTypes.string.isRequired,
  setSubCategoryFilter: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  subCategories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      categoryId: PropTypes.string.isRequired, // Adjust based on your data structure
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
  disableSubCategory: PropTypes.bool,
};

ProductSearch.defaultProps = {
  disableSubCategory: false,
};

export default ProductSearch;
