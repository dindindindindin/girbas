import axios from "axios";

export const getSubCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subcategories`);

export const getSubCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`);

export const removeSubCategory = async (slug, authtoken) =>
  await axios.delete(
    `${process.env.REACT_APP_API}/subcategory/${slug}`,

    {
      headers: { authtoken: authtoken },
    }
  );

export const updateSubCategory = async (
  slug,
  updatedName,
  category,
  authtoken
) =>
  await axios.put(
    `${process.env.REACT_APP_API}/subcategory/${slug}`,
    { name: updatedName, category: category },
    {
      headers: { authtoken: authtoken },
    }
  );

export const createSubCategory = async (subCategoryName, category, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-subcategory`,
    { name: subCategoryName, category: category },
    {
      headers: { authtoken: authtoken },
    }
  );
