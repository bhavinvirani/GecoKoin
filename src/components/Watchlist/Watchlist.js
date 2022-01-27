import { doc, setDoc } from "firebase/firestore";
import { CryptoState } from "../../CryptoContext";
import { db } from "../../firebase";
const {user, watchlist, setAlert } = CryptoState();

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

export  {add, remove};