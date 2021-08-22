import React, { useState } from "react";
import UserNav from "../../components/UserNav";
import { makeStyles, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { auth } from "../../firebase";

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
    padding: theme.spacing(2),
  },
  password: {
    marginTop: "0",
  },
}));

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validate()) {
      try {
        await auth.currentUser.updatePassword(password);
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        setSuccessful(true);
      } catch (error) {
        const errorCode = error.code;
        setLoading(false);

        if (errorCode === "auth/weak-password") {
          setErrors({ password: "Şifreniz çok zayıf." });
        } else if (errorCode === "auth/requires-recent-login") {
          setErrors({
            confirmPassword:
              "Güvenlik sebebiyle şifrenizi değiştirebilmek için yeniden giriş yapmanız gerekli.",
          });
        } else {
          setErrors({ confirmPassword: error.message });
          console.log(errorCode);
        }
      }
    }
  };

  const validate = () => {
    let currentErrors = {};
    let isValid = true;

    if (!password) {
      setLoading(false);
      isValid = false;
      currentErrors["password"] = "Lütfen şifre giriniz.";
    }

    if (!confirmPassword) {
      setLoading(false);
      isValid = false;
      currentErrors["confirmPassword"] = "Lütfen tekrar şifre giriniz.";
    }

    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        setLoading(false);
        isValid = false;
        currentErrors["password"] = "Şifreler aynı değil.";
      }
    }
    setErrors(currentErrors);

    return isValid;
  };

  return (
    <div className={classes.root}>
      <UserNav />
      <Paper className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            className={classes.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifreniz"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <Typography color="error">{errors.confirmPassword}</Typography>
          {loading && <LinearProgress />}
          {successful && (
            <Typography color="primary">Şifreniz değişmiştir.</Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            ŞİFREMİ DEĞİŞTİR
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default ChangePassword;
