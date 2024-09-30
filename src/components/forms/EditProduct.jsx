import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Alert,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryAction,
  getCategorySubsAction,
} from "../../features/categories/catAction";
import {
  getOneProductAction,
  updateProductAction,
} from "../../features/products/productAction";
import { useParams } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import {
  CustomInput,
  CustomSelect,
} from "../../components/common/custom-input/CustomInput";
import FileUpload from "../../components/forms/FileUpload";

const EditProduct = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [errors, setErrors] = useState({});
  const [newColor, setNewColor] = useState("");

  const product = useSelector((state) => state.productInfo.product);
  const cats = useSelector((state) => state.catInfo.cats);
  const subCats = useSelector((state) => state.subCatInfo.subCats);

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
    thumbnail: "",
  });

  useEffect(() => {
    if (_id) {
      dispatch(getOneProductAction(_id));
    }
  }, [dispatch, _id]);

  useEffect(() => {
    if (product) {
      setForm({
        category: product.category || "",
        subCatId: product.subCategories[0] || "",
        name: product.name || "",
        sku: product.sku || "",
        qty: product.qty || "",
        price: product.price || "",
        salesPrice: product.salesPrice || "",
        salesStart: product.salesStart
          ? new Date(product.salesStart).toISOString().split("T")[0]
          : "",
        salesEnd: product.salesEnd
          ? new Date(product.salesEnd).toISOString().split("T")[0]
          : "",
        description: product.description || "",
        shipping: product.shipping || "",
        color: product.color || [], // Get colors from product
        brand: product.brand || "",
        thumbnail: product.thumbnail || "",
      });
      setImages(product.images || []);
      setThumbnail(product.thumbnail || "");
    }
  }, [product, setForm]);

  useEffect(() => {
    if (form.category) {
      dispatch(getCategorySubsAction(form.category));
    }
  }, [form.category, dispatch]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setForm({ ...form, category, subCatId: "" });
    if (category) {
      dispatch(getCategorySubsAction(category));
    }
  };

  const handleSubCatChange = (e) => {
    const subCatId = e.target.value;
    setForm({ ...form, subCatId });
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
      images,
      thumbnail,
    };

    dispatch(updateProductAction(_id, formData));
    setErrors({});
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
      label: "Brand",
      name: "brand",
      type: "text",
      placeholder: "Product brand",
    },
  ];

  return (
    <Container>
      <h2 className="my-4">Edit Product</h2>
      <hr />
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
              value={form[item.name]}
            />
          ) : (
            <CustomInput
              key={i}
              {...item}
              onChange={handleOnChange}
              value={form[item.name]}
            />
          );
        })}

        <InputGroup className="mb-3 mt-3">
          <FormControl
            type="text"
            placeholder="Add Color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
          <Button variant="primary" onClick={handleAddColor}>
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
                    marginBottom: "5px",
                  }}
                >
                  {color}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveColor(color)}
                  >
                    <FaTimes />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FileUpload
          images={images}
          setImages={setImages}
          setThumbnail={setThumbnail}
        />
        <Button type="submit" variant="success" className="mt-3">
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
