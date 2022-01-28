import {
  Checkbox,
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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import Columns from "./util/MainTableHeader";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// ---------------------------------------------------------------------

const useStyle = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
  tableHead: {
    backgroundImage:
      "linear-gradient(-225deg, #ac32e4 0%, #7918f2 50%, #4801fe 100%)",
  },
}));

const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    currency,
    symbol,
    coins,
    loading,
    fetchCoins,
    user,
    watchlist,
    setAlert,
  } = CryptoState();

  const classes = useStyle();
  const navigate = useNavigate();

  //*  Watchlist -----------------------------------------------------
  const remove = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      //* update to firebase DB
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        //* true to update on firebase
        { merge: "true" }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from Watchlist !!`,
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const add = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });
      setAlert({
        open: true,
        message: `${coin.name} Added to Watchlist`,
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const handleWishlist = (coin) => {
    if (user) {
      const inWatchlist = watchlist.includes(coin?.id);
      if (inWatchlist) {
        remove(coin);
      } else {
        add(coin);
      }
    } else {
      setAlert({
        open: true,
        message: "Plese Login to use Watchlist Feature",
        type: "error",
      });
    }
  };

  //-------------------------------------------------
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

  // console.log("table", coins[0]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="lg" style={{ textAlign: "center" }}>
        <Typography variant="h5" style={{ margin: 18 }}>
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
            <LinearProgress style={{ backgroundColor: "#7918f2" }} />
          ) : (
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  {Columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.id === "coin" ? "" : "center"}
                      style={{
                        color: "#151515",
                        fontWeight: "700",
                        maxWidht: column.maxWidth,
                        minWidht: column.minWidth,
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
                    // console.log("here",row)
                    let profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        className={classes.row}
                        key={row.name}
                        onClick={() => navigate(`/coins/${row.id}`)}
                      >
                        <TableCell align="center">
                          {
                            <Checkbox
                              checked={watchlist.includes(row?.id)}
                              onChange={(e) => handleWishlist(row)}
                              size="small"
                              color="default"
                              style={{ paddingBottom: 10, marginRight: 5 }}
                            />
                          }
                          {row.market_cap_rank}
                        </TableCell>
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
                        <TableCell align="center">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell align="center">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: profit > 0 ? "#70a338" : "#ae3b2e",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                          {profit ? (
                            <AiOutlineRise
                              style={{ paddingLeft: "3px" }}
                              size={20}
                            />
                          ) : (
                            <AiOutlineFall
                              style={{ paddingLeft: "3px" }}
                              size={20}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {symbol} {numberWithCommas(row.low_24h.toFixed(2))}
                        </TableCell>
                        <TableCell align="center">
                          {symbol} {numberWithCommas(row.high_24h.toFixed(2))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          count={(handleSearch()?.length / 15).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 465);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
