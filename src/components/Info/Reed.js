import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DefiData, marketInfo } from "../../config/api";


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
}));

const Reed = ({ change, data }) => {
  const classes = useStyles();
  const [readMore, setReadMore] = useState(false);
  const [defiData, setDefiData] = useState();
  const [marketDetail, setMarketDetail] = useState();

  const fetchDetails = async () => {
    const { defiData } = await axios.get(DefiData());
    setDefiData(defiData);
  };
  const fetchData = async () => {
    const x = await axios.get(marketInfo());
    setMarketDetail(x);
    
  };
  useEffect(() => {
    fetchDetails();
    fetchData();
  }, [readMore]);

  console.log("data",defiData)


  return (
    <>
      <Typography className={classes.disc}>
        {`The global crypto market cap is`}{" "}
        <span style={{ color: change ? "red" : "green" }}>
          {data?.market_cap_change_percentage_24h_usd?.toFixed(2) + "%"}
        </span>
        {` ${change ? "decrease" : "increse"} over the last
        day.`}
        {readMore ? (
          <a
            className={classes.read}
            href=" #"
            onClick={() => setReadMore(false)}
          >
            Read Less
          </a>
        ) : (
          <a
            className={classes.read}
            href=" #"
            onClick={() => setReadMore(true)}
          >
            Read More
          </a>
        )}
      </Typography>

      {readMore && (
        <Typography className={classes.disc}>
          The Total crypto market volume is
          <span> {marketDetail?.totalMarketCap}</span>.The total volume in DeFi is
          currently
          <span style={{ color: "gray" }}>
            {defiData?.defi_market_cap?.toFixed(2)}
          </span>
          , 2.72% of the total crypto market 24-hour volume. The volume of all
          stable coins is now $82.38B, which is 15.14% of the total crypto
          market 24-hour volume. Bitcoin's price is currently $36,666.48.
          Bitcoin’s dominance is currently 41.97%, a decrease of 0.13% over the
          day.
        </Typography>
      )}
    </>
  );
};

export default Reed;
