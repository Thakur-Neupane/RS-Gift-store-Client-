import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../common/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { createNewCategoryAction } from "../../features/categories/catAction";

export const AddNewCategory = ({ setShow }) => {
  const titleRef = useRef("");
  const dispatch = useDispatch();

  const handleOnSubmit = async () => {
    const title = titleRef.current.value;
    if (!title) {
      return alert("Must fill up the form first");
    }

    const isSuccess = await dispatch(
      createNewCategoryAction({
        title,
      })
    );

    isSuccess && setShow(false);
  };

  const inputs = [
    {
      label: "Title",
      name: "title",
      type: "text",
      required: true,
      placeholder: "Phones",
      forwardRef: titleRef,
    },
  ];

  return (
    <>
      <div>
        <Form className="">
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} />
          ))}

          <div className="d-grid mt-3">
            <Button onClick={handleOnSubmit}>Submit</Button>
          </div>
        </Form>
      </div>
    </>
  );
};
