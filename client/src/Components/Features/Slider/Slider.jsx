import "./Slider.css";
import { useContext } from "react";
import { ReducersContext } from "../../../Contexts/Context";
import { addCommas } from "../../../Utils/Utils-Functions";
import { addToWishlist } from "../../../Actions/User-Action";
import AliceCarousel from 'react-alice-carousel';

const Slider = () => {

  const {cryptoData , userDispatch} = useContext(ReducersContext);

  let coins = cryptoData.map((coin) => 
    <section className="coins-info-container">
    <img onClick={() => userDispatch(addToWishlist(coin))} className="slider-Pics" src={coin.image} alt={coin.name} />
    <div>
      <span>{coin.symbol}</span>
      <span style={{color: coin.price_change_percentage_24h > 0 ? "green" : "red"}}>
      {coin.price_change_percentage_24h > 0 && "+"}{coin.price_change_percentage_24h.toFixed(2)}%
      </span>
    </div>
    <p style={{color:"whitesmoke" , fontSize:"15px"}}>{addCommas(coin.market_cap)}$</p>
    </section>
  )

  const responsiveSettings = {
    0 : {
      items : 2 ,
    } ,
    
    600 : {
      items : 4
    }
  }

  return (
    <section className="slider-Container">
      <AliceCarousel
       mouseTracking
       infinite
       autoPlayInterval={2000}
       animationDuration={2000}
       disableDotsControls
       responsive={responsiveSettings}
       autoPlay
       autoHeight
       disableButtonsControls
       items={coins}
      />
    </section>
  );
};

export default Slider;
