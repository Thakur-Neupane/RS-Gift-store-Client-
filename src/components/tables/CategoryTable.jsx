import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryAction,
  deleteCategoryAction,
} from "../../features/categories/catAction";
import EditCategory from "../forms/EditCategor";
import LocalSearch from "../forms/LocalSearch";
import AddNewSubCategory from "../forms/AddNewSubCategory";
import { FaEdit, FaTrash } from "react-icons/fa";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  const [selectedCat, setSelectedCat] = useState({});
  const [keyword, setKeyword] = useState("");
  const [showAddSubCat, setShowAddSubCat] = useState(false);
  const [showEditCat, setShowEditCat] = useState(false);
  const { cats } = useSelector((state) => state.catInfo);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const handleOnEdit = (obj) => {
    setSelectedCat(obj);
    setShowEditCat(true);
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(slug)).then(() => {
        dispatch(getCategoryAction());
      });
    }
  };

  const handleAddSubCategory = (cat) => {
    setSelectedCat(cat);
    setShowAddSubCat(true);
  };

  const searched = (keyword) => (item) =>
    item.title.toLowerCase().includes(keyword);

  const getRowClass = (status) => {
    return status === "active" ? "table-success" : "table-danger";
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center w-100 mb-3">
        <h2 className="me-auto">We have {cats.length} Categories!</h2>
        <LocalSearch
          keyword={keyword}
          setKeyword={setKeyword}
          type="categories"
        />
      </div>

      {showAddSubCat && (
        <AddNewSubCategory
          setShow={setShowAddSubCat}
          selectedCat={selectedCat}
          isFromCategoryTable={true}
        />
      )}

      {showEditCat && (
        <EditCategory selectedCat={selectedCat} setShow={setShowEditCat} />
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Category Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cats
            .filter(searched(keyword))
            .map(({ _id, status, title, slug }, i) => (
              <tr key={_id} className={getRowClass(status)}>
                <td>{i + 1}</td>
                <td>{status}</td>
                <td>{title}</td>
                <td>{slug}</td>
                <td>
                  <Button
                    onClick={() => handleOnEdit({ _id, status, title, slug })}
                    variant="warning"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleDelete(slug)}
                    variant="danger"
                    className="ms-2"
                  >
                    <FaTrash />
                  </Button>
                  {status === "active" && (
                    <Button
                      onClick={() => handleAddSubCategory({ _id, title })}
                      variant="info"
                      className="ms-2"
                    >
                      Add Sub-Category
                    </Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};
