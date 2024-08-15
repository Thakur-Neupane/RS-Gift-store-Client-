import { apiProcessor } from "../../services/axios";
const subCatEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/sub-categories";

// Post new subcategory
export const postNewSubCategory = (data) => {
  const obj = {
    url: subCatEP,
    method: "post",
    data,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Get all sub-categories
export const getAllSubCategories = () => {
  const obj = {
    url: subCatEP,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};

// Delete subcategory by slug
export const deleteSubCategory = (slug) => {
  const obj = {
    url: `${subCatEP}/${slug}`,
    method: "delete",
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Update subcategory by slug
export const updateSubCategory = async (slug, subcategory) => {
  const obj = {
    url: `${subCatEP}/${slug}`,
    method: "put",
    data: subcategory,
    isPrivate: true,
    showToast: true,
  };

  return apiProcessor(obj);
};

// Get all sub-categories by parent category id
export const getAllSubCategoriesByParentCatId = (parentCatId) => {
  const obj = {
    url: `${subCatEP}/${parentCatId}`,
    method: "get",
    isPrivate: true,
  };

  return apiProcessor(obj);
};
