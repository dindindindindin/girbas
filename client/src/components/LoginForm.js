import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../reducers/userSlice";
import { useHistory } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: { authtoken: authtoken },
    }
  );
};

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

const LoginForm = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  let dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token).then((res) =>
        console.log("create or update user res: ", res)
      );

      //  dispatch(loggedInUser({ email: user.email, token: idTokenResult.token }));

      setEmail("");
      setPassword("");
      setErrors({});
      // history.push("/");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-email") {
        setErrors({ email: "Lütfen geçerli bir e-posta giriniz." });
      } else if (errorCode === "auth/user-not-found") {
        setErrors({ password: "Girilen hesap geçersiz." });
      } else if (errorCode === "auth/wrong-password") {
        setErrors({ password: "Girilen şifre hatalı." });
      } else {
        setErrors({ password: error.message });
      }
    }
  };

  return (
    <div className={classes.paper}>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="E-posta Adresiniz"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography color="error">{errors.email}</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Şifreniz"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography color="error">{errors.password}</Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          GİRİŞ YAP
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/sifremi-unuttum" variant="body2">
              Şifrenizi mi unuttunuz?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={(e) => props.handleChange(e, 1)} variant="body2">
              Hesabınız yok mu?
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;
