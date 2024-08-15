import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Modal,
  Pagination,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductAction,
  deleteProductAction,
} from "../../features/products/productAction";
import { getCategoryAction } from "../../features/categories/catAction";
import { getSubCategoryAction } from "../../features/subcategories/subCatAction";
import ProductCard from "../../components/cards/ProductCard";

const PRODUCTS_PER_PAGE = 6;

const ProductsDashboard = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.productInfo.products);
  const categories = useSelector((state) => state.catInfo.cats);
  const subCategories = useSelector((state) => state.subCatInfo.subCats);

  useEffect(() => {
    dispatch(getProductAction());
    dispatch(getCategoryAction());
    dispatch(getSubCategoryAction());
  }, [dispatch]);

  const handleDelete = (_id) => {
    setProductToDelete(_id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProductAction(productToDelete))
      .then(() => {
        setShowConfirmation(false);
        setProductToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Handle error
      });
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setProductToDelete(null);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(keyword.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true) &&
      (subCategoryFilter
        ? product.subCategories.includes(subCategoryFilter)
        : true)
    );
  });

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <h2 className="my-4">Products Dashboard</h2>

      {/* Search and Filter Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-25"
        />
        <Form.Control
          as="select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-25"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </Form.Control>
        <Form.Control
          as="select"
          value={subCategoryFilter}
          onChange={(e) => setSubCategoryFilter(e.target.value)}
          className="w-25"
          disabled={!categoryFilter}
        >
          <option value="">All Sub-Categories</option>
          {subCategories
            .filter((subCat) => subCat.parent === categoryFilter)
            .map((subCat) => (
              <option key={subCat._id} value={subCat._id}>
                {subCat.title}
              </option>
            ))}
        </Form.Control>
      </div>

      {/* Products Found Info */}
      <div className="mb-4">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <p>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found.
          </p>
        )}
      </div>

      {/* Product Cards */}
      <Row>
        {paginatedProducts.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} className="mb-3">
            <ProductCard product={product} onDelete={handleDelete} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductsDashboard;
