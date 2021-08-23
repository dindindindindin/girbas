import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import AdminNav from "../../../components/AdminNav";
import { getCategories, removeCategory } from "../../../functions/category";
import {
  getSubCategories,
  removeSubCategory,
} from "../../../functions/subCategory";

import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
//import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    display: "flex",
  },
  subPaper: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
  },
  typography: { flexGrow: 1 },
}));

const CategoryUpdate = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.user);
  const classes = useStyles();

  useEffect(() => {
    loadCategories();
    loadSubCategories();
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
  const loadSubCategories = async () => {
    try {
      const subCategoriesRes = await getSubCategories();
      setSubCategories(subCategoriesRes.data);
      console.log("subCategories ", subCategories);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCategoryRemove = async (slug) => {
    if (window.confirm("Silinsin mi?")) {
      try {
        await removeCategory(slug, user.token);
        loadCategories();
        loadSubCategories();
      } catch (error) {
        if (error.response.status === 400) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      }
    }
  };
  const handleSubCategoryRemove = async (slug) => {
    if (window.confirm("Silinsin mi?")) {
      try {
        await removeSubCategory(slug, user.token);
        loadCategories();
        loadSubCategories();
      } catch (error) {
        if (error.response.status === 400) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={4}>
          <AdminNav />
        </Grid>
        <Grid item sm={12} md={8}>
          <Typography color="secondary">{error}</Typography>
          {categories.map((c) => {
            return (
              <div>
                <Paper key={c.id} className={classes.paper}>
                  <Typography className={classes.typography}>
                    {c.name}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={`/admin/kategori/${c.slug}`}
                    size="small"
                    color="primary"
                  >
                    GÜNCELLE
                  </Button>
                  <Button
                    onClick={() => handleCategoryRemove(c.slug)}
                    size="small"
                    color="secondary"
                  >
                    SİL
                  </Button>
                </Paper>
                {subCategories.map((s) => {
                  if (s.category_id === c.id) {
                    return (
                      <Paper key={s.id} className={classes.subPaper}>
                        <Typography className={classes.typography}>
                          {s.name}
                        </Typography>
                        <Button
                          component={RouterLink}
                          to={`/admin/alt-kategori/${s.slug}`}
                          size="small"
                          color="primary"
                        >
                          GÜNCELLE
                        </Button>
                        <Button
                          onClick={() => handleSubCategoryRemove(s.slug)}
                          size="small"
                          color="secondary"
                        >
                          SİL
                        </Button>
                      </Paper>
                    );
                  }
                })}
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoryUpdate;
