import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import useForm from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryAction,
  getCategorySubsAction,
} from "../../features/categories/catAction";
import { Link } from "react-router-dom";
import { createNewProductAction } from "../../features/products/productAction";
import {
  CustomInput,
  CustomSelect,
} from "../../components/common/custom-input/CustomInput";
import FileUpload from "../../components/forms/FileUpload";

const NewProduct = () => {
  const { form, setForm, handleOnChange } = useForm({
    category: "",
    subCatId: "",
    name: "",
    sku: "",
    qty: "",
    price: "",
    salesPrice: "",
    salesStart: "",
    salesEnd: "",
    description: "",
    shipping: "",
    color: "",
    brand: "",
    thumbnail: "", // Thumbnail URL or identifier
  });

  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(""); // Local state for thumbnail
  const [errors, setErrors] = useState({}); // State for form validation errors

  const dispatch = useDispatch();
  const cats = useSelector((state) => state.catInfo.cats);
  const subCats = useSelector((state) => state.subCatInfo.subCats);

  useEffect(() => {
    if (!cats.length) {
      dispatch(getCategoryAction());
    }
  }, [dispatch, cats]);

  useEffect(() => {
    if (form.category) {
      dispatch(getCategorySubsAction(form.category));
    }
  }, [form.category, dispatch]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setForm({ ...form, category, subCatId: "" }); // Reset subCatId when category changes
    if (category) {
      dispatch(getCategorySubsAction(category));
    }
  };

  const handleSubCatChange = (e) => {
    const subCatId = e.target.value;
    setForm({ ...form, subCatId });
  };

  const validateForm = () => {
    const newErrors = {};
    const currentDate = new Date();

    if (
      form.salesPrice &&
      form.price &&
      parseFloat(form.salesPrice) >= parseFloat(form.price)
    ) {
      newErrors.salesPrice = "Sales Price must be less than Price.";
    }

    if (form.salesStart && new Date(form.salesStart) < currentDate) {
      newErrors.salesStart = "Sales Start Date cannot be in the past.";
    }

    if (
      form.salesStart &&
      form.salesEnd &&
      new Date(form.salesEnd) <= new Date(form.salesStart)
    ) {
      newErrors.salesEnd = "Sales End Date must be after Sales Start Date.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = {
      ...form,
      subCategories: form.subCatId ? [form.subCatId] : [],
      images, // Include images in form data
      thumbnail, // Include thumbnail in form data
    };

    dispatch(createNewProductAction(formData));
    setForm({
      category: "",
      subCatId: "",
      name: "",
      sku: "",
      qty: "",
      price: "",
      salesPrice: "",
      salesStart: "",
      salesEnd: "",
      description: "",
      shipping: "",
      color: "",
      brand: "",
      thumbnail: "",
    });
    setImages([]); // Clear images after submit
    setThumbnail(""); // Clear thumbnail after submit
    setErrors({}); // Clear errors after submit
  };

  const catOptions = cats
    .filter((p) => p.status === "active")
    .map(({ title, _id }) => ({
      text: title,
      value: _id,
    }));

  const subCatOptions = subCats
    .filter((sub) => sub.parent === form.category)
    .map(({ title, _id }) => ({
      text: title,
      value: _id,
    }));

  const inputs = [
    {
      label: "Category",
      name: "category",
      type: "text",
      required: true,
      isSelectType: true,
      options: catOptions,
      onChange: handleCategoryChange,
    },
    {
      label: "Sub-Category",
      name: "subCatId",
      type: "text",
      required: true,
      isSelectType: true,
      options: subCatOptions,
      onChange: handleSubCatChange,
    },
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
      placeholder: "Phones",
    },
    {
      label: "SKU",
      name: "sku",
      type: "text",
      required: true,
      placeholder: "DJK-H9879",
    },
    {
      label: "Qty",
      name: "qty",
      type: "number",
      min: 1,
      required: true,
      placeholder: "22",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      min: 1,
      required: true,
      placeholder: "234",
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      min: 1,
      placeholder: "22",
    },
    {
      label: "Sales Start Date",
      name: "salesStart",
      type: "date",
    },
    {
      label: "Sales End Date",
      name: "salesEnd",
      type: "date",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      as: "textarea",
      maxLength: 2000,
      rows: 10,
      required: true,
      placeholder: "Write product details",
    },
    {
      label: "Shipping",
      name: "shipping",
      type: "text",
      placeholder: "Yes or No",
    },
    {
      label: "Color",
      name: "color",
      type: "text",
      placeholder: "Product color",
    },
    {
      label: "Brand",
      name: "brand",
      type: "text",
      placeholder: "Product brand",
    },
  ];

  return (
    <div>
      <h2>Create New Product</h2>
      <hr />
      <Link to="/admin/products">
        <Button variant="secondary">&lt; Back</Button>
      </Link>
      <Form onSubmit={handleOnSubmit}>
        {errors.salesPrice && (
          <Alert variant="danger">{errors.salesPrice}</Alert>
        )}
        {errors.salesStart && (
          <Alert variant="danger">{errors.salesStart}</Alert>
        )}
        {errors.salesEnd && <Alert variant="danger">{errors.salesEnd}</Alert>}
        {inputs.map((item, i) => {
          return item.isSelectType ? (
            <CustomSelect
              key={i}
              {...item}
              onChange={
                item.name === "subCatId"
                  ? handleSubCatChange
                  : handleCategoryChange
              }
              options={item.name === "subCatId" ? subCatOptions : item.options}
            />
          ) : (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          );
        })}
        <FileUpload
          setImages={setImages}
          images={images}
          setThumbnail={setThumbnail}
        />
        {thumbnail && (
          <div className="thumbnail-preview mt-3">
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
        <div className="d-grid mt-3">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewProduct;
