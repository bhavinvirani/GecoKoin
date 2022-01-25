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
  tagline:{
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  }
}));

const Banner = () => {
  const classes = useStyles();
  return <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
            <Typography variant="h2" style={{fontWeight: "bold", marginBottom: 15 }}>
                gecokoin
            </Typography>
            <Typography variant="subtitle2" style={{color:"darkgray", textTransform:"capitalize"}}>
                Get all the Info regarding your favorite Crypt0 Currancy
            </Typography>
        </div>
        <Carousel></Carousel>

      </Container>
  </div>;
};

export default Banner;
