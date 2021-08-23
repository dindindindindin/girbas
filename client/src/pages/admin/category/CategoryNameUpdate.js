import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import { updateCategory, getCategory } from "../../../functions/category";

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
  },
}));

const CategoryNameUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const user = useSelector((state) => state.user);
  const classes = useStyles();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const category = await getCategory(match.params.slug);
      setName(category.data[0].name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCategory(match.params.slug, name, user.token);
      setError("");
      setName("");
      setLoading(false);
      setSuccessful(true);
      history.push("/admin/kategoriler");
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

  const categoryUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Yeni kategori ismi"
          name="category"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Typography color="error">{error}</Typography>
        {loading && <LinearProgress />}
        {successful && (
          <Typography color="primary">Kategori güncellendi.</Typography>
        )}
        <Button type="submit" fullWidth variant="contained" color="primary">
          KATEGORİ GÜNCELLE
        </Button>
      </form>
    );
  };

  return (
    <div className={classes.root}>
      <AdminNav />
      <Paper className={classes.paper}>
        <Typography variant="h6">Kategori Güncelle</Typography>
        {categoryUpdateForm()}
      </Paper>
    </div>
  );
};

export default CategoryNameUpdate;
