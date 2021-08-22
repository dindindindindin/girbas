import React from "react";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  link: {
    color: "inherit",
    "&:hover": { color: "inherit", textDecoration: "none" },
  },
}));

const UserNav = () => {
  const classes = useStyles();

  return (
    <nav>
      <Paper className={classes.paper}>
        <MenuList>
          <Link component={RouterLink} to="/hesabim" className={classes.link}>
            <MenuItem>Hesabım</MenuItem>
          </Link>
          <Link
            component={RouterLink}
            to="/hesabim/sifremi-degistir"
            className={classes.link}
          >
            <MenuItem>Şifremi Değiştir</MenuItem>
          </Link>
        </MenuList>
      </Paper>
    </nav>
  );
};

export default UserNav;
