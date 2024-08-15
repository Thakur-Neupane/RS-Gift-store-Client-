import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CustomInput } from "../common/custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { createNewSubCategoryAction } from "../../features/subcategories/subCatAction";
import useForm from "../../Hooks/useForm";

const AddNewSubCategory = ({ setShow, selectedCat, isFromCategoryTable }) => {
  const { form, setForm, handleOnChange } = useForm();
  const dispatch = useDispatch();
  const { cats } = useSelector((state) => state.catInfo);

  useEffect(() => {
    if (selectedCat && selectedCat._id) {
      if (isFromCategoryTable) {
        setForm({ parentCatId: selectedCat._id, title: "" });
      } else {
        setForm({ parentCatId: "", title: "" });
      }
    }
  }, [selectedCat, setForm, isFromCategoryTable]);

  // Filter active categories
  const activeCats = cats.filter((cat) => cat.status === "active");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const isSuccess = await dispatch(
      createNewSubCategoryAction({
        title: form.title,
        parentCatId: form.parentCatId,
      })
    );

    if (isSuccess) setShow(false);
  };

  const sortedCats = Array.isArray(activeCats)
    ? [...activeCats].sort((a, b) => a.title.localeCompare(b.title))
    : [];

  return (
    <Modal show={true} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Sub-Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group>
            <Form.Label>Parent Category</Form.Label>
            {isFromCategoryTable ? (
              <Form.Control
                type="text"
                readOnly
                value={selectedCat ? selectedCat.title : ""}
              />
            ) : (
              <Form.Control
                as="select"
                name="parentCatId"
                onChange={handleOnChange}
                required
              >
                <option value="">Select a Parent Category</option>
                {sortedCats.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </Form.Control>
            )}
          </Form.Group>
          <CustomInput
            label="Sub-Category"
            name="title"
            type="text"
            required
            placeholder="Sub-Category"
            onChange={handleOnChange}
          />
          <div className="d-grid mt-3">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewSubCategory;
