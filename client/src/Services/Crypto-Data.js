const baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const singleCoinUrl = `https://api.coingecko.com/api/v3/coins`;

const dataSettings = "market_chart?vs_currency=usd&days=365";

export const getCryptoData = async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const getSingleCoin = async (id) => {
  try {
    const response = await fetch(`${singleCoinUrl}/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const getsCoinHistoricGraph = async (cryptoName) => {
  try {
    const response = await fetch(`${singleCoinUrl}/${cryptoName}/${dataSettings}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
