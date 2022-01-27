import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner4.png)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  discription: {
    fontSize: 18,
    color: "#a3a3a3",
    textTransform: "capitalize",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography className={classes.title} variant="h2">
            gecokoin
          </Typography>
          <Typography variant="subtitle2" className={classes.discription}>
            Get all the Info regarding your favorite Crypt0 Currancy
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
