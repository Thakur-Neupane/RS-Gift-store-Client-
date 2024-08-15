import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput, CustomSelect } from "../common/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { updateSubCategoryAction } from "../../features/subcategories/subCatAction";
import useForm from "../../Hooks/useForm";
import { CustomModal } from "../common/custom-modal/CustomModal";

const EditSubCategory = ({ selectedCat, setShow }) => {
  const dispatch = useDispatch();
  const { form, setForm, handleOnChange } = useForm({});

  useEffect(() => {
    if (selectedCat) {
      setForm(selectedCat);
    }
  }, [selectedCat, setForm]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        updateSubCategoryAction(selectedCat.slug, form)
      );

      if (response) {
        setShow(false);
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const inputs = [
    {
      isSelectType: true,
      label: "Status",
      name: "status",
      required: true,
      options: [
        {
          text: "Active",
          value: "active",
          selected: form.status === "active",
        },
        {
          text: "Inactive",
          value: "inactive",
          selected: form.status === "inactive",
        },
      ],
    },
    {
      label: "Title",
      name: "title",
      required: true,
      value: form.title,
    },
    {
      label: "Slug",
      name: "slug",
      required: true,
      value: form.slug,
      disabled: true,
    },
  ];

  return (
    <CustomModal show={true} setShow={setShow} title="Edit Sub-Category">
      <Form onSubmit={handleOnSubmit}>
        {inputs.map((item, i) =>
          item.isSelectType ? (
            <CustomSelect key={i} {...item} onChange={handleOnChange} />
          ) : (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          )
        )}

        <div className="d-grid mt-3">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </CustomModal>
  );
};

export default EditSubCategory;
