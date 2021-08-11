import { IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { auth } from "../firebase";

const useStyles = makeStyles(() => ({
  link: {
    color: "inherit",
  },
}));

const RightHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const classes = useStyles();

  const handleMenuClose = () => setAnchorEl(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log("current user: ", auth.currentUser);

  const profileLoggedOut = (
    <Link component={RouterLink} to="/uyelik" className={classes.link}>
      <IconButton edge="end" aria-label="Üyelik" color="inherit">
        <AccountCircleIcon />
      </IconButton>
    </Link>
  );

  const profileLoggedIn = (
    <IconButton
      edge="end"
      aria-label="Hesabım"
      color="inherit"
      onClick={handleProfileMenuOpen}
    >
      <AccountCircleIcon />
    </IconButton>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Hesabım</MenuItem>
      <MenuItem onClick={handleMenuClose}>Çıkış yap</MenuItem>
    </Menu>
  );

  return (
    <div>
      <IconButton aria-label="Ara" color="inherit">
        <SearchIcon />
      </IconButton>
      <IconButton aria-label="Sepetim" color="inherit">
        <ShoppingCartIcon />
      </IconButton>
      {auth.currentUser == null ? profileLoggedOut : profileLoggedIn}
      {renderMenu}
    </div>
  );
};

export default RightHeader;
