import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const classes = useStyles();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    try {
      await auth.sendPasswordResetEmail(email, config);
      setEmail("");
      setErrors("");
      setSuccess("Şifre sıfırlama linki e-posta adresinize gönderildi.");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-email") {
        setErrors("Lütfen geçerli bir e-posta giriniz.");
      } else if (errorCode === "auth/user-not-found") {
        setErrors("Böyle bir hesap bulunamadı.");
      } else {
        setErrors(error.message);
        console.log(error.message);
      }
    }
  };

  return (
    <Container maxWidth="xs">
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
        <Typography color="error">{errors}</Typography>
        <Typography color="primary">{success}</Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          E-POSTA GÖNDER
        </Button>
      </form>
    </Container>
  );
};

export default ForgotPassword;
