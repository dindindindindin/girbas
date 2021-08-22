import axios from "axios";

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(
    `${process.env.REACT_APP_API}/category/${slug}`,

    {
      headers: { authtoken: authtoken },
    }
  );

export const updateCategory = async (slug, updatedName, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    { name: updatedName },
    {
      headers: { authtoken: authtoken },
    }
  );

export const createCategory = async (categoryName, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-category`,
    { name: categoryName },
    {
      headers: { authtoken: authtoken },
    }
  );
