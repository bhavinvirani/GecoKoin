import {
  Box,
  CircularProgress,
  createTheme,
  makeStyles,
  Slider,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { HistoricalChart, singlCoinDetail } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import CoinBottomInfo from "./CoinBottomInfo";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 30,
      paddingTop: 0,
    },
  },
  buttonDiv: {
    display: "flex",
    marginTop: 20,
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  info: {
    marginBottom: 20,
    display: "flex",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 6,
  },
  percentage: {
    backgroundColor: "#242433",
    color: "white",
    borderRadius: "4px",
    fontSize: 27,
    marginLeft: 10,
  },
  text: {
    margin: 6,
    marginBlock: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 10,
  },
  slider: {
    display: "flex",
  },
  lh: {
    marginLeft: 12,
    marginRight: 12,
  },
}));

const Coininfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [oneCoin, setOneCoin] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);
  const classes = useStyles();
  const { currency, symbol } = CryptoState();

  const fetchHistoryData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    const x = await axios.get(singlCoinDetail(coin.id, currency));
    setflag(true);
    setOneCoin(x.data[0]);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoryData();
  }, [days]);

  console.log(oneCoin);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  let profit = coin.market_data.price_change_percentage_24h > 0
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <div className={classes.info}>
          <div className={classes.price}>
            {symbol}
            {currencyFormat(coin.market_data.current_price.usd)}
          </div>
          <div
            className={classes.percentage}
            style={{
              backgroundColor:
                profit
                  ? "#28d980"
                  : "red",
            }}
          >
            {coin.market_data.price_change_percentage_24h > 0 ? (
              <div>
                <span>
                  <ArrowDropUpIcon className={classes.arrow} />
                </span>
                <span className={classes.text}>
                  {Number(coin.market_data.price_change_percentage_24h).toFixed(
                    2
                  )}
                  %
                </span>
              </div>
            ) : (
              <div>
                <span>
                  <ArrowDropDownIcon />
                </span>
                <span className={classes.text}>
                  {Number(coin.market_data.price_change_percentage_24h).toFixed(
                    2
                  )}
                  %
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={classes.slider}>
          <span className={classes.lh}>Low:<span style={{fontWeight: "bold"}}>{` ${oneCoin?.low_24h}`}</span></span>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Today's market"
              color="secondory"
              defaultValue={profit ? 65 : 45}
              style={{color: profit ? "#28d980" : "red"}}
              disabled
            />
          </Box>
          <span className={classes.lh}>High:<span style={{fontWeight: "bold"}}>{` ${oneCoin?.high_24h}`}</span></span>
        </div>

        {!historicData | (flag === false) ? (
          <CircularProgress
            style={{ color: "#4801fe" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                      : `${date.getHours()} : ${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days ) in ${currency}`,
                    borderColor: "#6579ec",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: days <= 1 ? 3 :1 ,
                  },
                },
              }}
            />
            <div className={classes.buttonDiv}>
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
        <CoinBottomInfo coin={coin} />
      </div>
    </ThemeProvider>
  );
};

export default Coininfo;
