import React, { useState, useEffect } from "react";
import { Button, Form, Alert, InputGroup, FormControl } from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";
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
    color: [], // Color array
    brand: "",
    thumbnail: "", // Thumbnail URL or identifier
  });

  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(""); // Local state for thumbnail
  const [errors, setErrors] = useState({}); // State for form validation errors
  const [newColor, setNewColor] = useState(""); // Local state for new color input

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
      thumbnail,
    };

    dispatch(createNewProductAction(formData));
    setForm({
      category: "",
      subCatId: "",
      name: "",
      sku: "",
      quantity: "",
      price: "",
      salesPrice: "",
      salesStart: "",
      salesEnd: "",
      description: "",
      shipping: "",
      color: [], // Reset color array
      brand: "",
      thumbnail: "",
    });
    setImages([]); // Clear images after submit
    setThumbnail(""); // Clear thumbnail after submit
    setErrors({}); // Clear errors after submit
    setNewColor(""); // Clear new color input after submit
  };

  const handleAddColor = () => {
    if (newColor && !form.color.includes(newColor)) {
      setForm((prevForm) => ({
        ...prevForm,
        color: [...prevForm.color, newColor],
      }));
      setNewColor(""); // Clear input after adding
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setForm((prevForm) => ({
      ...prevForm,
      color: prevForm.color.filter((color) => color !== colorToRemove),
    }));
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
      name: "quantity",
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
          if (item.isSelectType) {
            return (
              <CustomSelect
                key={i}
                {...item}
                onChange={
                  item.name === "subCatId"
                    ? handleSubCatChange
                    : handleCategoryChange
                }
                options={
                  item.name === "subCatId" ? subCatOptions : item.options
                }
              />
            );
          }
          return <CustomInput key={i} {...item} onChange={handleOnChange} />;
        })}

        <InputGroup className="mb-3 mt-3">
          <FormControl
            type="text"
            placeholder="Colors Available for the"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={handleAddColor}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaPlus />
          </Button>
        </InputGroup>

        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          {form.color.length > 0 && (
            <ul>
              {form.color.map((color, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  {color}
                  <Button
                    variant="link"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleRemoveColor(color)}
                    style={{ color: "red" }}
                  >
                    <FaTimes />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

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
