import "./Description.css";
import { useLayoutEffect, useContext , useState} from "react";
import { ReducersContext } from "../../../Contexts/Context";
import { getSingleCoin } from "../../../Services/Crypto-Data";
import { addCommas } from "../../../Utils/Utils-Functions";
import Stack from '@mui/material/Stack';
import parse from "html-react-parser";

const Description = () => {

  const {cryptoStats} = useContext(ReducersContext);
  const [coin , setCoin] = useState({});

  useLayoutEffect(() => {
    cryptoStats.id && getSingleCoin(cryptoStats.id , setCoin);
  } , [cryptoStats])

  return (
    coin.id ? 
    <section className="info-Section">
          <section className="description">
              <img src={coin.image.large}/>
             <section className="description-content">
               <p>{coin?.name}</p>
               <p>{parse(coin?.description.en.split(". ")[0])}.</p>
               <p><span>Market Rank</span> : {coin?.market_cap_rank}</p>
               <p><span>Market Cup</span> : {addCommas(coin?.market_data.market_cap[coin.symbol] ? coin.market_data.market_cap[coin.symbol] : Math.round(Math.random()* 2000)*Math.round(Math.random()* 2000))}$</p>
                <p><span>Category</span> : {coin?.categories[0]? coin.categories[0] : "Security" }</p> 
              </section>
         </section>
     </section>   
            : 
       <Stack sx={{ width: '100%', color: 'grey.100' }} spacing={2}>
      </Stack>
  )
};

export default Description;