
const baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

const singleCoinUrl =  `https://api.coingecko.com/api/v3/coins`;

export const getCryptoData = async () => {
   return await fetch (baseUrl)
    .then(data => data.json())
    .catch(error => error)
} 

export const getSingleCoin = async (id) => {
   return await fetch(`${singleCoinUrl}/${id}`)
   .then(data => data.json())
   .catch(error => error)
}
 

