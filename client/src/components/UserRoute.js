import React from "react";
import { Route, Link } from "react-router";
import { useSelector } from "react-redux";

const UserRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    "error"
  );
};
