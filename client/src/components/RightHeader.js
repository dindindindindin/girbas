import { IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { logout } from "../reducers/userSlice";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  link: {
    color: "inherit",
    "&:hover": { color: "inherit", textDecoration: "none" },
  },
}));

const RightHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const handleMenuClose = () => setAnchorEl(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    auth.signOut();
    dispatch(logout());
    handleMenuClose();
    history.push("/");
  };

  console.log("current user: ", user);
  console.log("current firebase user: ", auth.currentUser);

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
      <Link component={RouterLink} to="/hesabim" className={classes.link}>
        <MenuItem onClick={handleMenuClose}>Hesabım</MenuItem>
      </Link>
      <MenuItem onClick={handleLogout}>Çıkış yap</MenuItem>
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
      {user == null ? profileLoggedOut : profileLoggedIn}
      {renderMenu}
    </div>
  );
};

export default RightHeader;
