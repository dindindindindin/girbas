import React from "react";
import { Route, Link } from "react-router";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const UserRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/uyelik" />
        )
      }
    />
  );
};

export default UserRoute;
