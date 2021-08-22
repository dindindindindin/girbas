import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { currentAdmin } from "../functions/auth";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    let isUnmounted = false;
    const isAdmin = async () => {
      if (user && user.token) {
        try {
          const res = await currentAdmin(user.token);
          if (!isUnmounted) {
            setOk(true);
            setLoading(false);
          }
          console.log("current admin res: ", res);
        } catch (error) {
          if (!isUnmounted) {
            setOk(false);
            setLoading(false);
          }
          console.log("current admin error ", error);
        }
      }
    };
    isAdmin();
    if (!loading) console.log("is ok ", ok);
    return () => {
      isUnmounted = true;
    };
  }, []);

  return (
    !loading && (
      <Route
        {...rest}
        render={(props) =>
          ok ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    )
  );
};

export default AdminRoute;
