import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const Coininfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);
  const { currency } = CryptoState();

  const fetchHistoryData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoryData();
  }, [days]);
  // console.log("data", historicData)

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
    buttonDiv: {
      display: "flex",
      marginTop: 20,
      justifyContent: "space-around",
      width: "100%",
    },
  }));
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData | (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
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
                    borderColor: "orange",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
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
      </div>
    </ThemeProvider>
  );
};

export default Coininfo;
