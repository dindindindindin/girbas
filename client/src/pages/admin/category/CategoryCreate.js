import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import { createCategory, getCategories } from "../../../functions/category";

import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  categoriesPaper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
}));

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const [categories, setCategories] = useState([]);

  const user = useSelector((state) => state.user);
  const classes = useStyles();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesRes = await getCategories();
      setCategories(categoriesRes.data);
      console.log("categories ", categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCategory(name, user.token);
      loadCategories();
      setError("");
      setName("");
      setLoading(false);
      setSuccessful(true);
    } catch (error) {
      setLoading(false);
      setSuccessful(false);
      if (error.response.status === 400) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
  };

  const categoryCreateForm = () => {
    return (
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Kategori ismi"
          name="category"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Typography color="error">{error}</Typography>
        {loading && <LinearProgress />}
        {successful && (
          <Typography color="primary">Kategori yaratıldı.</Typography>
        )}
        <Button type="submit" fullWidth variant="contained" color="primary">
          KATEGORİ YARAT
        </Button>
      </form>
    );
  };

  return (
    <div className={classes.root}>
      <AdminNav />
      <Paper className={classes.paper}>
        <Typography variant="h6">Kategori Yarat</Typography>
        {categoryCreateForm()}
      </Paper>
      <Paper className={classes.categoriesPaper}>
        <Typography variant="h6">Kategoriler</Typography>
        {categories.map((c) => (
          <div>{c.name}</div>
        ))}
      </Paper>
    </div>
  );
};

export default CategoryCreate;
