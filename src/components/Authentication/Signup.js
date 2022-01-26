import { Box, Button, TextField } from "@material-ui/core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { validateEmail } from "../../config/validate";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";

const Signup = ({ handleClose }) => {
  const { setAlert } = CryptoState();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const handleSubmit = async () => {
    if (!email || !pwd || !confirmPwd) {
      setAlert({
        open: true,
        message: "Plese fill all the Fields",
        type: "error",
      });
      return;
    } else if (!validateEmail(email)) {
      setAlert({
        open: true,
        message: "Invalid Email",
        type: "error",
      });
      return;
    } else if (pwd !== confirmPwd) {
      setAlert({
        open: true,
        message: "Passwords not matched",
        type: "error",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, pwd);
      // console.log(result)
      setAlert({
        open: true,
        message: `Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (e) {
      console.log(e);
      setAlert({
        open: true,
        message: e.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        label="Enter Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Confirm Password"
        type="password"
        value={confirmPwd}
        onChange={(e) => setConfirmPwd(e.target.value)}
        fullWidth
      />
      <Button
        className="btn-grad"
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "#00ADB5" }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
