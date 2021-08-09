import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const LoginSignup = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.root}>
        <Tabs value={currentTab} variant="fullWidth" onChange={handleChange}>
          <Tab label="GİRİŞ YAP" />
          <Tab label="ÜYE OL" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <LoginForm handleChange={handleChange} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <SignupForm handleChange={handleChange} />
        </TabPanel>
      </div>
    </Container>
  );
};

export default LoginSignup;
