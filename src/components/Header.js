import {
  AppBar,
  Container,
  createTheme,
  Link,
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
import CodeIcon from "@mui/icons-material/Code";

const useStyle = makeStyles(() => ({
  title: {
    color: "#f0f9ffe0",
    fontWeight: "bolder",
    flex: 1,
    cursor: "pointer",
  },
  codeLink: {
    marginTop: 3,
    marginLeft: 16,
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
  const { pathname } = useLocation();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        style={{ background: "#121212" }}
        color="transparent"
        position={pathname === "/" ? "sticky" : "static"}
      >
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
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"GBP"}>GBP</MenuItem>
              <MenuItem value={"CNY"}>CNY</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModel />}
            {pathname === "/" && (
              <Link
                className={classes.codeLink}
                target="_blank"
                href="https://github.com/bhavinvirani/GecoKoin"
              >
                <CodeIcon />
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
