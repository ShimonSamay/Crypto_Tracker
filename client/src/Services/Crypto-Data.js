
const baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

const singleCoinUrl =  `https://api.coingecko.com/api/v3/coins`;

const dataSettings = "market_chart?vs_currency=usd&days=365";



export const getCryptoData = async () => {
   return await fetch (baseUrl)
    .then(data => data.json())
    .catch(error => error)
} 

export const getSingleCoin = async (id , setState) => {
   return await fetch(`${singleCoinUrl}/${id}`)
   .then(data => data.json())
   .then(data => {
      data.id && setState(data);
    })
   .catch(error => error)
}

export const getsCoinHistoricGraph = async (crypto , setState) => {
  return await fetch (`${singleCoinUrl}/${crypto}/${dataSettings}`)
  .then(data => data.json())
  .then(data => {
   data.prices && setState(data.prices)
  })
  .catch(error => error)
}
 
