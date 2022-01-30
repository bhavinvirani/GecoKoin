import {
  Card,
  CardContent,
  Container,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  mainInfoDiv: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  rank: {
    display: "flex",
    flexDirection: "row",
    padding: "10px 0 6px 15px",
  },
  coinInfo: {
    backgroundColor: "#242433",
    color: "white",
    borderRadius: "4px",
    padding: "8px 10px",
    fontSize: 14,
    margin: "0 5px",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
    },
  },
  ref: {
    display: "flex",
    flexDirection: "row",
    padding: "6px 0 10px 15px",
    [theme.breakpoints.down("md")]: {
      padding: "8px 0 10px 0",
    },
  },

  tag: {
    backgroundColor: "#242433",
    color: "white",
    borderRadius: "4px",
    padding: "8px 10px",
    fontSize: 14,
    margin: "0 5px",
    "&:hover": {
      backgroundColor: "#6579ec",
    },
  },
  data: {
    widht: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  root: {
    backgroundColor: "#121212",
    margin: 8,
    borderColor: "gray",
  },
  title: {
    color: "white",
    [theme.breakpoints.down("md")]: {
        fontSize: "3vw"

    },
  },
  cardData: {
    color: "white",
    [theme.breakpoints.down("md")]: {
        fontSize: "2vw"
    },
  },
}));

const CoinLeftInfo = ({ coin }) => {
  const classes = useStyles();
  const { symbol, currency } = CryptoState();
  console.log("coin", coin)
  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <Container className={classes.mainInfoDiv}>
      <div className={classes.link}>
        <div className={classes.rank}>
          <div className={classes.coinInfo}>Rank #{coin.market_cap_rank}</div>
          {coin.categories[0] && (
            <div className={classes.coinInfo}>{coin.categories[0]}</div>
          )}
        </div>

        <div className={classes.ref}>
          <Link
            style={{ textDecoration: "none" }}
            href={coin.links.homepage[0]}
            target="_blank"
            rel="noreferrer"
          >
            <div className={classes.tag}>
              <LinkIcon
                style={{
                  transform: "rotate(-40deg)",
                  fontSize: 18,
                }}
              />
              Website
            </div>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            href={`https://twitter.com/${coin.links.twitter_screen_name}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className={classes.tag}>
              <LinkIcon
                style={{
                  transform: "rotate(-40deg)",
                  fontSize: 18,
                }}
              />
              Twitter
            </div>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            href={`https://facebook.com/${coin.links.facebook_username}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className={classes.tag}>
              <LinkIcon
                style={{
                  transform: "rotate(-40deg)",
                  fontSize: 18,
                  padding: 0,
                }}
              />
              Facebook
            </div>
          </Link>
        </div>
      </div>
      <div className={classes.data}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} gutterBottom variant="h5">
              Market Cap
            </Typography>
            <Typography className={classes.cardData} variant="h6">
              $
              {currencyFormat(Number(coin.market_data.market_cap.usd))}
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} gutterBottom variant="h5">
              Total Volume
            </Typography>
            <Typography className={classes.cardData} variant="h6">
              $
              {currencyFormat(Number(coin.market_data.total_volume.usd))}
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} gutterBottom variant="h5">
              Fully Diluted Market Cap
            </Typography>
            <Typography className={classes.cardData} variant="h6">
              $
              {currencyFormat(
                Number(coin.market_data.fully_diluted_valuation.usd)
              )}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} gutterBottom variant="h5">
              Circulating Supply
            </Typography>
            <Typography className={classes.cardData} variant="h6">
              {currencyFormat(Number(coin.market_data.circulating_supply))}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default CoinLeftInfo;
