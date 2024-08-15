import React, { useEffect, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProductAction } from "../../features/products/productAction";
import {
  getCategoryAction,
  getCategorySubsAction,
} from "../../features/categories/catAction";
import { getSubCategoryAction } from "../../features/subcategories/subCatAction";
import ProductSearch from "../forms/ProductSearch";

const PRODUCTS_PER_PAGE = 10;

export const ProductTable = () => {
  const [displayProd, setDisplayProd] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { products } = useSelector((state) => state.productInfo);
  const { cats } = useSelector((state) => state.catInfo);
  const { subCats } = useSelector((state) => state.subCatInfo);

  const [subCatMap, setSubCatMap] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAction());
    dispatch(getCategoryAction());
    dispatch(getSubCategoryAction());
  }, [dispatch]);

  // Create a map of subcategory IDs to titles for quick lookup
  useEffect(() => {
    const map = subCats.reduce((acc, subCat) => {
      acc[subCat._id] = subCat.title;
      return acc;
    }, {});
    setSubCatMap(map);
  }, [subCats]);

  useEffect(() => {
    let filteredProducts = products;

    if (keyword) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.category === categoryFilter
      );
    }

    if (subCategoryFilter) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.subCategories.includes(subCategoryFilter)
      );
    }

    setDisplayProd(filteredProducts);
    setCurrentPage(1); // Reset to first page on filter change
  }, [products, keyword, categoryFilter, subCategoryFilter]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = displayProd.slice(startIndex, endIndex);
  const totalPages = Math.ceil(displayProd.length / PRODUCTS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div>{displayProd.length} Products Found</div>
        <div>
          <ProductSearch
            keyword={keyword}
            setKeyword={setKeyword}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            subCategoryFilter={subCategoryFilter}
            setSubCategoryFilter={setSubCategoryFilter}
            categories={cats}
            subCategories={subCats.filter((sc) => sc.parent === categoryFilter)}
            type="products"
            disableSubCategory={!categoryFilter}
          />
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Sales Price</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((prod, index) => (
            <tr
              key={prod._id}
              className={
                prod.status === "active" ? "table-success" : "table-danger"
              }
            >
              <td>{startIndex + index + 1}</td>
              <td>{prod.status === "active" ? "Active" : "Inactive"}</td>
              <td>
                <img src={prod.thumbnail} width="70px" alt="" />
              </td>
              <td>{prod.name}</td>
              <td>{prod.sku}</td>
              <td>
                {cats.find((cat) => cat._id === prod.category)?.title || "N/A"}
              </td>
              <td>
                {prod.subCategories.length > 0
                  ? prod.subCategories
                      .map((id) => subCatMap[id] || "N/A")
                      .join(", ")
                  : "N/A"}
              </td>
              <td>
                {prod.description.length > 50
                  ? `${prod.description.slice(0, 50)}...`
                  : prod.description}
              </td>
              <td>{prod.price}</td>
              <td>{prod.qty}</td>
              <td>
                ${prod.salesPrice}
                {prod.salesStart && prod.salesEnd ? (
                  <div>
                    <hr />
                    {prod.salesStart.slice(0, 10)} to <hr />
                    {prod.salesEnd.slice(0, 10)}
                    <hr />
                  </div>
                ) : null}
              </td>
              <td>{prod.color}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
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
    </div>
  );
};

export default ProductTable;
