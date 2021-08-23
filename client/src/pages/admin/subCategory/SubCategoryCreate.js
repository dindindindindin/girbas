import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import { getCategories } from "../../../functions/category";
import { createSubCategory } from "../../../functions/subCategory";

import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  formControl: {
    marginRight: theme.spacing(2),
    width: "100%",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const SubCategoryCreate = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const [category, setCategory] = useState("");
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
      await createSubCategory(name, category, user.token);
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
        <FormControl className={classes.formControl}>
          <InputLabel id="category-label">Kategori</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Alt kategori ismi"
          name="subcategory"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Typography color="error">{error}</Typography>
        {loading && <LinearProgress />}
        {successful && (
          <Typography color="primary">Alt kategori yaratıldı.</Typography>
        )}
        <Button type="submit" fullWidth variant="contained" color="primary">
          ALT KATEGORİ YARAT
        </Button>
      </form>
    );
  };

  return (
    <div className={classes.root}>
      <AdminNav />
      <Paper className={classes.paper}>
        <Typography variant="h6">Alt Kategori Yarat</Typography>
        {categoryCreateForm()}
      </Paper>
    </div>
  );
};

export default SubCategoryCreate;
