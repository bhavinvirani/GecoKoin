export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&sparkline=true&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const singlCoinDetail = (coin, currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coin}&order=market_cap_desc&per_page=1&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const Globle = () => `https://api.coingecko.com/api/v3/global`;

export const TopSearchedCoin = () =>
`https://api.coingecko.com/api/v3/search/trending`;

export const Exchanges = () =>
`https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1`;

//TODO:
export const CategoryList = (category) =>
  `https://api.coingecko.com/api/v3/coins/${category}/list`;

export const DefiData = () =>
  `https://api.coingecko.com/api/v3/global/decentralized_finance_defi`;

export const Categories = () =>
  `https://api.coingecko.com/api/v3/coins/categories`;


export const FetchNewsAPI = (category) => 
  `https://min-api.cryptocompare.com/data/v2/news/?categories=${category}`


////////////////////////////////////////////////////////////////////////

export const marketInfo = () => {
  'https://api.coinranking.com/v2/coins?limit=1' 
}
