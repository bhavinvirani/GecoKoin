import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Box, Button, Tab, Tabs } from "@material-ui/core";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import GithubButton from "react-github-login-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import CryptoContext, { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 450,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 5,
  },
  AuthButton: {
    cursor: "pointer",
    width: 85,
    height: 40,
    backgroundColor: "#ECB365",
  },
  OAuthButtons: {
    padding: 24,
    paddingTop: 6,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 14,
    fontSize: 20,
  },
}));

export default function AuthModel() {
  const { setAlert } = CryptoState();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res);

        setAlert({
          open: true,
          message: `${res.operationType} Successful`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  const signInWithGithub = () => {};

  return (
    <div>
      <Button
        className={classes.AuthButton}
        variant="contained"
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="Login" />
                <Tab label="SignUp" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className={classes.OAuthButtons}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none", borderRadius: 4 }}
                onClick={signInWithGoogle}
              />
              <GithubButton
                style={{ width: "100%", outline: "none", borderRadius: 4 }}
                onClick={signInWithGithub}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
