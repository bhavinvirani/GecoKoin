export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&sparkline=true&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

//TODO:
export const TopSearchedCoin = () =>
  `https://api.coingecko.com/api/v3/search/trending`;

export const CategoryList = (category) =>
  `https://api.coingecko.com/api/v3/coins/${category}/list`;

export const Globle = () => `https://api.coingecko.com/api/v3/global`;

export const DefiData =() => `https://api.coingecko.com/api/v3/global/decentralized_finance_defi`