import axios from "axios";
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import Coininfo from "../components/Coininfo";
import { numberWithCommas } from "../components/Banner/Carousel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import CoinLeftInfo from "../components/CoinLeftInfo";
// import add from "../components/Watchlist/Watchlist";

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const {user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);
  // console.log(coin?.links?.homepage[0]);

  //TODO: add in saparte file
  const useStyle = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid gray",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 15,
      fontSize: 35,
    },
    coinData: {
      alignSelf: "start",
      padding: 18,
      paddingTop: 10,
      width: "100%",

      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));
  const classes = useStyle();

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
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

  const removeFromWatchlist = async () => {
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

  if (!coin) return <LinearProgress style={{ backgroundColor: "#7918f2" }} />;

  return (
    <div className={classes.container}>
      {/* sidebar */}
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="120"
        />
        <Typography component="h2" variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        {/* ///////////////////////////////////////////////////////////////////// */}
        <CoinLeftInfo coin={coin} />
        

        

        <div className={classes.coinData}>
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#AA2232" : "#229bf7",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add To Watchlist"}
            </Button>
          )}
        </div>
      </div>

      {/* chart */}
      <Coininfo coin={coin} />
    </div>
  );
};

export default Coinpage;
