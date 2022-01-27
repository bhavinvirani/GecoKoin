import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Coinpage from "./Pages/Coinpage";
import Homepage from "./Pages/Homepage";
import "./App.css";
import { makeStyles } from "@material-ui/core";
import Alert from "./components/util/Alert";
import Scroll from "./components/util/Scroll";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#121212",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
      </div>
      <Scroll showBelow={420} />
      <Alert />
    </Router>
  );
}

export default App;
