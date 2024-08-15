import { apiProcessor } from "../../services/axios";
const catEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/categories";

// Post new category
export const postNewCategory = (data) => {
  const obj = {
    url: catEP,
    method: "post",
    data,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Get all categories
export const getAllCategories = () => {
  const obj = {
    url: catEP,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// Get a single category by slug
export const getACategory = (slug) => {
  const obj = {
    url: `${catEP}/${slug}`,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// Delete category by slug
export const deleteCategory = (slug) => {
  const obj = {
    url: `${catEP}/${slug}`,
    method: "delete",
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Update category by slug
export const updateCategory = (slug, category) => {
  const obj = {
    url: `${catEP}/${slug}`,
    method: "put",
    data: category,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

export const getCategorySubs = (_id) => {
  const obj = {
    url: `${catEP}/sub-category/${_id}`,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};
