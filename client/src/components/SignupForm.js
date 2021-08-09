import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignupForm = (props) => {
  const classes = useStyles();
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = useCallback(
    ({ target: { name, value } }) =>
      setInput((state) => ({ ...state, [name]: value })),
    []
  );
  console.log(input);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log(input);

      let emptyInput = {};
      emptyInput["email"] = "";
      emptyInput["password"] = "";
      emptyInput["confirmPassword"] = "";
      setInput(emptyInput);

      console.log("basarili");
    }
  };

  const validate = () => {
    let currentInput = input;
    let currentErrors = {};
    let isValid = true;

    if (!currentInput["email"]) {
      isValid = false;
      currentErrors["email"] = "Lütfen e-posta adresinizi giriniz.";
    }

    if (typeof currentInput["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(currentInput["email"])) {
        isValid = false;
        currentErrors["email"] = "Lütfen geçerli bir e-posta giriniz.";
      }
    }

    if (!currentInput["password"]) {
      isValid = false;
      currentErrors["password"] = "Lütfen şifre giriniz.";
    }

    if (!currentInput["confirmPassword"]) {
      isValid = false;
      currentErrors["confirmPassword"] = "Lütfen tekrar şifre giriniz.";
    }

    if (
      typeof currentInput["password"] !== "undefined" &&
      typeof currentInput["confirmPassword"] !== "undefined"
    ) {
      if (currentInput["password"] !== currentInput["confirmPassword"]) {
        isValid = false;
        currentErrors["password"] = "Şifreler aynı değil.";
      }
    }

    setErrors(currentErrors);

    return isValid;
  };

  return (
    <div className={classes.paper}>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="E-posta Adresiniz"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
          value={input.email}
        />
        <Typography color="error">{errors.email}</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Şifreniz"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
          value={input.password}
        />
        <Typography color="error">{errors.password}</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Tekrar Şifreniz"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
          value={input.confirmPassword}
        />
        <Typography color="error">{errors.confirmPassword}</Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          ÜYE OL
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              href="#"
              onClick={(e) => props.handleChange(e, 0)}
              variant="body2"
            >
              Zaten hesabınız var mı? Giriş yap
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignupForm;
