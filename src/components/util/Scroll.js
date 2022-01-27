import { IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const useStyle = makeStyles((theme) => ({
  toTop: {
    zIndex: 2,
    position: "fixed",
    bottom: "2vh",
    backgroundColor: "#c0bdbd",
    color: "black",
    "&:hover, &.Mui-focusVisible": {
      Transition: "0.3s",
      color: "#7918f2",
      backgroundColor: "#c0bdbd",
    },
    right: "3%",
  },
}));

const Scroll = ({ showBelow }) => {
  const classes = new useStyle();
  const [show, setShow] = useState(showBelow ? false : true);

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
        if (show) setShow(false);
    }
  };
  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });
  return (
    <div>
      {show && (
        <IconButton className={classes.toTop} onClick={handleClick}>
          {" "}
          <ArrowUpwardIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Scroll;
