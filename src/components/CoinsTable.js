import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";

// ---------------------------------------------------------------------

const useStyle = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
}));

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = CryptoState();

  const classes = useStyle();
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  // -----------------------------------------
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const columns = [
    { id: "coin", label: "Coin", minWidth: 170 },
    { id: "price", label: "Price", minWidth: 100 },
    {
      id: "24h_change",
      label: "24h change",
      //   minWidth: 170,
      //   align: "right",
      //   format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "market_cap",
      label: "Market Cap",
      //   minWidth: 170,
      //   align: "right",
      //   format: (value) => value.toLocaleString("en-US"),
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="lg" style={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          style={{ margin: 18}}
        >
          Cryptocurrency Prices
        </Typography>
        <TextField
          label="Search For Crypto Currency"
          variant="outlined"
          style={{ marginBottom: 20, width: "80%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#D65A31" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#24A19C" }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.id === "coin" ? "" : "right"}
                      style={{
                        color: "black",
                        fontWeight: "700",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 15, (page - 1) * 15 + 15)
                  .map((row) => {
                    // console.log(row)
                    let profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        className={classes.row}
                        key={row.name}
                        onClick={() => navigate(`/coins/${row.id}`)}
                      >
                        <TableCell
                          component="th"
                          scop="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{ padding: 20, width: "100%", display: "flex", justifyContent: "center" }}
          count={(handleSearch()?.length / 15).toFixed(0)}
          onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 465)
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
