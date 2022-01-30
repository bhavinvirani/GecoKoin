import {
  Container,
  makeStyles,
  Switch,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Link,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Globle, TopSearchedCoin, Exchanges } from "../../config/api";
import Reed from "./Reed";


const useStyles = makeStyles(() => ({
  infoDiv: {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    justifyContent: "space-around",
  },
  infoHeading: {
    flex: 1,
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 25,
  },
  disc: {
    fontSize: 14,
    color: "#a3a3a3",
    textTransform: "capitalize",
  },
  switchDiv: {
    display: "flex",
    flexDirection: "row",
  },
  switchHighlight: {
    fontSize: 14,
    color: "#a3a3a3",
    marginTop: 12,
  },
  read: {
    textDecoration: "underline",
    color: "#797979",
    margin: "0 0 0 3px",
    cursor: "pointer",
  },
  highMain: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: 18,
    marginBottom: 8,
    height: "26vh",
  },
  card: {
    maxWidth: 370,
    marginRight: 18,
    marginLeft: 18,
    backgroundColor: "#16171a",
    borderRadius: 6,
    overflowY: "auto",
  },
}));

const Info = () => {
  const classes = useStyles();
  const [highlight, setHighlight] = useState(false);
  const [data, setData] = useState();

  const [topData, setTopData] = useState();
  const [exchange, setExchange] = useState();

  const fetchDetails = async () => {
    const { data } = await axios.get(Globle());
    setData(data.data);
  };
  const fetchTop7Data = async () => {
    const { data } = await axios.get(TopSearchedCoin());
    setTopData(data?.coins);
  };
  const fetchExchangeData = async () => {
    const { data } = await axios.get(Exchanges());
    setExchange(data);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    fetchTop7Data();
    fetchExchangeData();
  }, []);

  let change = data?.market_cap_change_percentage_24h_usd < 0;
  //TODO: set dynamic data

  return (
    <Container maxWidth="lg" className={classes.infoDiv}>
      <div className={classes.switchDiv}>
        <Typography className={classes.infoHeading}>
          Today's Cryptocurrency Prices by Market Cap
        </Typography>
        <span className={classes.switchHighlight}>Highlight</span>
        <Switch
          style={{color:"#4801fe"}}
          checked={highlight}
          onChange={() => setHighlight(!highlight)}
        />
      </div>
      
      <Reed change={change} data={data}/>

      
      {highlight && (
        <div className={classes.highMain}>
          <Container maxWidth="xs" className={classes.card}>
            <Typography
              align="center"
              variant="h6"
              style={{ padding: 8, paddingBottom: 14, position: "static" }}
            >
              Top 7 Searched Coins
            </Typography>
            <TableContainer style={{ Widht: 550 }}>
              <Table>
                <TableBody style={{ color: "white" }}>
                  {topData &&
                    topData.map((items) => {
                      console.log(items);
                      return (
                        <TableRow styale={{ padding: 0 }} key={items.item.id}>
                          <TableCell align="right">
                            {items.item.score + 1}
                          </TableCell>
                          <TableCell style={{ display: "flex", gap: 3 }}>
                            <img
                              src={items.item.thumb}
                              alt={items.item.name}
                              height="26"
                              style={{ marginBottom: 10 }}
                            />
                          </TableCell>
                          <TableCell>
                            {
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 13,
                                  }}
                                >
                                  {items.item.symbol}
                                </span>
                                <span style={{ color: "darkgrey", fontSize: 12 }}>
                                  {items.item.name}
                                </span>
                              </div>
                            }
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>

          <Container maxWidth="xs" className={classes.card}>
            <Typography
              align="center"
              variant="h6"
              style={{ padding: 8, paddingBottom: 14 }}
            >
              Top 10 Crypto Exchanges
            </Typography>
            <TableContainer style={{ Widht: 550 }}>
              <Table>
                <TableBody style={{ color: "white" }}>
                  {exchange &&
                    exchange.map((ex) => {
                      return (
                        <TableRow  key={ex.id}>
                          <TableCell align="right">
                            {ex.trust_score_rank}
                          </TableCell>
                          <TableCell style={{ display: "flex", gap: 3 }}>
                            <img
                              src={ex?.image}
                              alt={ex.name}
                              height="28"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            ></div>
                          </TableCell>
                          <TableCell style={{ fontSize: 16 }}>
                            <a href={ex?.url} target=" _blank">{ex.name}</a>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          <div
            className={classes.card}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              align="center"
              style={{ padding: 8, paddingBottom: 14 }}
              variant="h5"
            >
              Total Crypto coins
            </Typography>
            <Typography
              align="center"
              variant="h3"
              style={{ color: "skyblue" }}
            >
              #{data?.active_cryptocurrencies}
            </Typography>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Info;
