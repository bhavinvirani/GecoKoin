import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModel from "./Authentication/AuthModel";
import UserSidebar from "./UserSidebar";

const useStyle = makeStyles(() => ({
  title: {
    color: "#ECB365",
    fontWeight: "bold",
    flex: 1,
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyle();
  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const {pathname} = useLocation();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color={pathname === "/" ? "#111111" : "transparent"} position={pathname === "/" ? "sticky" : "static"}>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
            >
              GecoKoin
            </Typography>
            <Select
              variant="outlined"
              lable="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{ width: 100, height: 40, marginRight: 15 }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ? <UserSidebar /> :<AuthModel />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
