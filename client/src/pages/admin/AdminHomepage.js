import React from "react";
import AdminNav from "../../components/AdminNav";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

const AdminHomepage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AdminNav />
      <p>admin anasayfa</p>
    </div>
  );
};

export default AdminHomepage;
