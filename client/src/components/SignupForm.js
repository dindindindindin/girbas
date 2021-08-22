import React, { useState, useCallback } from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../reducers/userSlice";
import { createOrGetUser } from "../functions/auth";

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
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  const history = useHistory();

  const handleChange = useCallback(
    ({ target: { name, value } }) =>
      setInput((state) => ({ ...state, [name]: value })),
    []
  );
  console.log(input);
  console.log(auth.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (validate()) {
      try {
        const result = await auth.createUserWithEmailAndPassword(
          input.email,
          input.password
        );

        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        const dbRes = await createOrGetUser(idTokenResult.token);
        console.log("create or get user res: ", dbRes);

        dispatch(
          loggedInUser({
            id: dbRes.data.id,
            email: dbRes.data.email,
            role: dbRes.data.role,
            token: idTokenResult.token,
          })
        );

        let emptyInput = {};
        emptyInput["email"] = "";
        emptyInput["password"] = "";
        emptyInput["confirmPassword"] = "";
        setInput(emptyInput);
        setLoading(false);
        history.push("/");
      } catch (error) {
        const errorCode = error.code;
        setLoading(false);
        if (errorCode === "auth/email-already-in-use") {
          setErrors({ email: "Bu e-posta zaten kayıtlı." });
        } else if (errorCode === "auth/invalid-email") {
          setErrors({ email: "Lütfen geçerli bir e-posta giriniz." });
        } else if (errorCode === "auth/weak-password") {
          setErrors({ password: "Şifreniz çok zayıf." });
        } else {
          setErrors({ confirmPassword: error.message });
        }
      }
    }
  };

  const validate = () => {
    let currentInput = input;
    let currentErrors = {};
    let isValid = true;

    if (!currentInput["email"]) {
      setLoading(false);
      isValid = false;
      currentErrors["email"] = "Lütfen e-posta adresinizi giriniz.";
    }

    if (currentInput["email"] !== "") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(currentInput["email"])) {
        setLoading(false);
        isValid = false;
        currentErrors["email"] = "Lütfen geçerli bir e-posta giriniz.";
      }
    }

    if (!currentInput["password"]) {
      setLoading(false);
      isValid = false;
      currentErrors["password"] = "Lütfen şifre giriniz.";
    }

    if (!currentInput["confirmPassword"]) {
      setLoading(false);
      isValid = false;
      currentErrors["confirmPassword"] = "Lütfen tekrar şifre giriniz.";
    }

    if (
      currentInput["password"] !== "" &&
      currentInput["confirmPassword"] !== ""
    ) {
      if (currentInput["password"] !== currentInput["confirmPassword"]) {
        setLoading(false);
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
        {loading && <LinearProgress />}
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
