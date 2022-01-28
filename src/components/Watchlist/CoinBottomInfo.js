import { Container, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Moment from "react-moment";
import { numberWithCommas } from "../Banner/Carousel";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CryptoState } from "../../CryptoContext";
import { display } from "@mui/system";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    marginTop: 30,
  },
  mainTitle: {
    fontSize: 28,
    marginBottom: 10,
    color: "white",
    [theme.breakpoints.down("md")]: {
      textAlign:"center"
    },
  },
  desc: {
    fontSize: 14,
    color: "#e4e4e4",
    lineHeight: 1.6,
  },
  history: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "spaceBetween",
    width: "50%",
    marginTop: 20,
  },
  card: {
    padding: 10,
    marginRight: 24,
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#4801fe",
      color: "white",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 3px 9px 0px",
    },
  },
  title: { padding: 10, fontWeight: "bolder" },
  date: { padding: 5, fontWeight: "light", color: "white" },
  price: { padding: 7 },
  current: { padding: 7, display: "flex", flexDirection: "row" },
}));
const CoinBottomInfo = ({ coin }) => {
  const { symbol } = CryptoState();

  const classes = useStyle();
  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function smallcurrenyFormat(num) {
    return num.toFixed(8).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1");
  }
  console.log("link",coin.links.homepage[0])
  return (
    <Container className={classes.container} maxWidth="lg">
      <div className={classes.mainTitle}>
        About <Link href={coin.links.homepage[0]}><span style={{color:"#7918f2"}}>{`${coin?.name}`}</span></Link>
      </div>
      <div
        className={classes.desc}
        dangerouslySetInnerHTML={{ __html: `${coin.description.en}` }}
      />
      <div />

      <div className={classes.history}>
        <div className={classes.card}>
          <div className={classes.title}>All Time High</div>
          <div className={classes.date}>
            <Moment format="MM/DD/YYYY hh:mm">
              {coin.market_data.ath_date.usd}
            </Moment>
          </div>
          <div className={classes.price}>
            <div style={{ color: "#26b05e" }}>
              {coin.market_data.ath.usd < 1
                ? `${symbol}${smallcurrenyFormat(coin.market_data.ath.usd)}`
                : `${symbol}${currencyFormat(coin.market_data.ath.usd)}`}
            </div>
            <div className={classes.current} style={{marginLeft: 4}}>
              <ArrowDropDownIcon style={{ color: "#c62236" }} />
              <span style={{ color: "#c62236", marginTop: 3 }}>
                {Number(coin.market_data.ath_change_percentage.usd).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.title}>All Time Low</div>
          <div className={classes.date}>
            <Moment format="MM/DD/YYYY hh:mm">
              {coin.market_data.atl_date.usd}
            </Moment>
          </div>
          <div className={classes.price}>
            <div style={{ color: "#c62236" }}>
              {coin.market_data.atl.usd < 1
                ? `${symbol}${smallcurrenyFormat(coin.market_data.atl.usd)}`
                : `${symbol}${currencyFormat(coin.market_data.atl.usd)}}`}
            </div>
            <div className={classes.current}>
              <ArrowDropUpIcon style={{ color: "#26b05e" }} />
              <span style={{ color: "#26b05e", marginTop: 3 }}>
                {Number(coin.market_data.atl_change_percentage.usd).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CoinBottomInfo;
