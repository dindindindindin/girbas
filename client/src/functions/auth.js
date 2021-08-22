import axios from "axios";

export const createOrGetUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-get-user`,
    {},
    {
      headers: { authtoken: authtoken },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: { authtoken: authtoken },
    }
  );
};
