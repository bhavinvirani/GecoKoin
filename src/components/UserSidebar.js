import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { CryptoState } from "../CryptoContext";
import { Avatar } from "@material-ui/core";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { numberWithCommas } from "./Banner/Carousel";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

const useStyles = makeStyles({
  homeavatar: {
    height: 38,
    width: 38,
    marginLeft: 8,
    cursor: "pointer",
    backgroundColor: "#7918f2",
  },
  container: {
    widht: 450,
    padding: 35,
    height: "100%",
    width: 340,
    display: "flex",
    flexDirection: "column",
    backgroundColor:"#121212"
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  userDeatil: {
    color: "#fff",
    widht: "1005",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bolder",
    wordWrap: "break-word",
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "gray",
    objectFit: "contain",
  },
  logoutButton: {
    height: "8%",
    widht: "100%",
    background: "#b23b3b",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor:"#343a40",
    borderRadius: 10,
    padding: 10,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
    "&::webkit-scrollbar": {
      width: ".25rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: "1px solid slategrey",
    },
  },
  watchlistCoin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#a560fa",
    boxShadow: "0 0 3px black",
  },
});

export default function UserSidebar() {
  const { user, setAlert, watchlist, coins, symbol, setWatchlist } = CryptoState();
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setWatchlist([])
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !!",
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
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

  return (
    <div>
      {["right"].map((anchor) => (
        <Fragment key={anchor}>
          <Avatar
            className={classes.homeavatar}
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />

          <Drawer
            anchor={anchor}
            open={drawerState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span className={classes.userDeatil}>
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className={classes.watchlistCoin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logoutButton}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}
