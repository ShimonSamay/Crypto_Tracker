import "./Coin.css";
import { useLayoutEffect, useContext , useState} from "react";
import { getSingleCoin } from "../../../Services/Crypto-Data";
import { ReducersContext } from "../../../Contexts/Context";

const Coin = () => {

  const {cryptoStats} = useContext(ReducersContext);
  const [coin , setCoin] = useState({})

  useLayoutEffect(() => {
    // if(cryptoStats.id) {
    getSingleCoin("ethereum")
    .then(data => {
      data.id && setCoin(data);
    })
  // }
  } , [cryptoStats])

  return (
     <section className="Coin-Main-Container">
      {
        coin.id && 
        <>
        <section className="info-Section">
          <section className="description">
              <img src={coin.image.large}/>
              <section className="description-content">
                <p>{coin.description.en.split(". ")[0]}</p>
              </section>
          </section>
        </section>
        
        <section className="graph-section">

        </section>

        </>
          
        
      }
     </section>
  )
};

export default Coin;
