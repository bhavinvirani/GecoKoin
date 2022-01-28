import { makeStyles, Link } from "@material-ui/core";
import React from "react";
import { Container } from "@material-ui/core";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LogoDevIcon from "@mui/icons-material/LogoDev";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "static",
    bottom: 0,
    display: "flex",
    backgroundColor: "#4801fe",
    width: "100%",
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
        <Link href="https://github.com/bhavinvirani" target="_blank"><GitHubIcon style={{color: "black",}}/></Link>
        <Link href="https://www.linkedin.com/in/bhavin-virani-2a14441b7/" target="_blank"><LinkedInIcon style={{color: "black",}}/></Link>
        <Link href="https://twitter.com/BhavinVirani45" target="_blank"><TwitterIcon style={{color: "black",}}/></Link>
        <Link href="https://dev.to/bhavinvirani" target="_blank"><LogoDevIcon style={{color: "black",}}/></Link>
    </div>
  );
};

export default Footer;
