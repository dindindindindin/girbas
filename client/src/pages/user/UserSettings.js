import React from "react";
import UserNav from "../../components/UserNav";

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

const UserSettings = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <UserNav />
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
      <p>user settings page</p>
    </div>
  );
};

export default UserSettings;
