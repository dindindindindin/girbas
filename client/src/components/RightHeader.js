import { IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  link: {
    color: "inherit",
  },
}));

const RightHeader = () => {
  const classes = useStyles();

  return (
    <div>
      <IconButton aria-label="Ara" color="inherit">
        <SearchIcon />
      </IconButton>
      <IconButton aria-label="Sepetim" color="inherit">
        <ShoppingCartIcon />
      </IconButton>

      <Link to="/uyelik" className={classes.link}>
        <IconButton edge="end" aria-label="Üyelik" color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Link>
    </div>
  );
};

export default RightHeader;
