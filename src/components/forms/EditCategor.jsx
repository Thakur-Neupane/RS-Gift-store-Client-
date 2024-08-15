import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput, CustomSelect } from "../common/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { updateCategoryAction } from "../../features/categories/catAction";
import useForm from "../../Hooks/useForm";
import { CustomModal } from "../common/custom-modal/CustomModal";

const EditCategory = ({ selectedCat, setShow }) => {
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
        updateCategoryAction(selectedCat.slug, form)
      );

      if (response) {
        setShow(false);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const inputs = [
    {
      isSelectType: true,
      label: "Status",
      name: "status",
      type: "text",
      required: true,
      options: [
        {
          text: "Active",
          value: "active",
          selected: form.status === "active",
        },
        {
          value: "inactive",
          text: "Inactive",
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
      placeholder: "Phones",
      value: form.slug,
      disabled: true,
    },
  ];

  return (
    <CustomModal show={true} setShow={setShow} title="Edit Category">
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
export default EditCategory;
