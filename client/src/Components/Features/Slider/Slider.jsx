import "./Slider.css";
import { useLayoutEffect, useState } from "react";
import { getCryptoData } from "../../../Services/Crypto-Data";
import AliceCarousel from 'react-alice-carousel';

const Slider = () => {
  const [sliderCoins, setSliderCoins] = useState([]);

  useLayoutEffect(() => {
    getCryptoData()
    .then((data) => setSliderCoins(data));
  }, []);
  
  let coins = sliderCoins.map((coin) => 
    <section className="coins-info-container">
    <img className="slider-Pics"
    src={coin.image}
    alt={coin.name}
    />
    <span style={{color:"wheat"}}>{coin.symbol}</span>
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
