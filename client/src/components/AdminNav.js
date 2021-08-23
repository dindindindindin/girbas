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

const AdminNav = () => {
  const classes = useStyles();

  return (
    <nav>
      <Paper className={classes.paper}>
        <MenuList>
          <Link component={RouterLink} to="/admin" className={classes.link}>
            <MenuItem>Admin Anasayfa</MenuItem>
          </Link>

          <Link
            component={RouterLink}
            to="/admin/urunler"
            className={classes.link}
          >
            <MenuItem>Ürünler</MenuItem>
          </Link>

          <Link
            component={RouterLink}
            to="/admin/kategoriler"
            className={classes.link}
          >
            <MenuItem>Kategoriler</MenuItem>
          </Link>

          <Link
            component={RouterLink}
            to="/admin/kategori-yarat"
            className={classes.link}
          >
            <MenuItem>Kategori Yarat</MenuItem>
          </Link>

          <Link
            component={RouterLink}
            to="/admin/alt-kategori-yarat"
            className={classes.link}
          >
            <MenuItem>Alt Kategori Yarat</MenuItem>
          </Link>
        </MenuList>
      </Paper>
    </nav>
  );
};

export default AdminNav;
