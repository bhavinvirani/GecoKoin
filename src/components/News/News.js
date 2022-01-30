import {
  Checkbox,
  CircularProgress,
  Container,
  createTheme,
  FormControlLabel,
  LinearProgress,
  makeStyles,
  Radio,
  RadioGroup,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FetchNewsAPI } from "../../config/api";
import NewsCard from "./NewsCard";
import AOS from 'aos';
import 'aos/dist/aos.css';


const useStyles = makeStyles((theme) => ({
  mainDiv: {
    display: "flex",
    flexDirection: "row",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    minWidth: 200,
    borderRight: "1px solid gray",
    marginLeft: 26,
  },
  right: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 20,
    
  },
  cardContainer:{
    
    [theme.breakpoints.down("md")]: {
      width: "31%"
    },
  }
}));

const News = () => {
  const classes = useStyles();

  const [categorie, setCategorie] = useState("ALL_NEWS_CATEGORIES");
  const [news, setNews] = useState();

  const fetchNews = async () => {
    const { data } = await axios.get(FetchNewsAPI(categorie));
    setNews(data.Data);
  };

  useEffect(() => {
    fetchNews();
  }, [categorie]);
  console.log("news", news);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const handleClick = (e) => {
    setCategorie(e.target.value)
    setNews()
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.mainDiv}>
        <div className={classes.left}>
          <Typography variant="h5">Categories</Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="ALL_NEWS_CATEGORIES"
            name="radio-buttons-group"
          >
            <FormControlLabel
              control={<Radio />}
              onClick={(e) => handleClick(e)}
              label={"All"}
              value={"ALL_NEWS_CATEGORIES"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Mining"}
              value={"Mining"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Exchange"}
              value={"Exchange"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Market"}
              value={"Market"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Asia"}
              value={"Asia"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"ICO"}
              value={"ICO"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Regulation"}
              value={"Regulation"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Blockchain"}
              value={"Blockchain"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"BTC"}
              value={"Trading"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Trading"}
              value={"Technology"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Wallet"}
              value={"Wallet"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Altcoin"}
              value={"Altcoin"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Fiat"}
              value={"Fiat"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Business"}
              value={"Business"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Commodity"}
              value={"Commodity"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"Sponsored"}
              value={"Sponsored"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"ETH"}
              value={"ETH"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"LTC"}
              value={"LTC"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"XMR"}
              value={"XMR"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"ADA"}
              value={"ADA"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"ZEC"}
              value={"ZEC"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"ETC"}
              value={"ETC"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"BCH"}
              value={"BCH"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"XRP"}
              value={"XRP"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"DASH"}
              value={"DASH"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"TRX"}
              value={"TRX"}
            />
            <FormControlLabel
              onClick={(e) => handleClick(e)}
              control={<Radio />}
              label={"USDT"}
              value={"USDT"}
            />
          </RadioGroup>
        </div>

        <Container  maxWidth="lg" className={classes.right}>
            {!news ? (
              <CircularProgress/>
            ) : (
              
              news.map((n) => <div className={classes.cardContainer}> <NewsCard className={classes.card} news={n} /> </div>)
            )}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default News;
