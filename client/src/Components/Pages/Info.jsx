import { useContext, useEffect } from "react";
import { cryptosDataAction } from "../../Actions/Crypto-Data-Action";
import { ReducersContext } from "../../Contexts/Context";
import Coin from "../Features/Coin/Coin";
import { getCryptoData } from "../../Services/Crypto-Data";
import CryptoTable from "../Features/Table/Table";
import Slider from "../Features/Slider/Slider";

const Info = () => {

  const {cryptoDataDispatch} = useContext(ReducersContext);

  useEffect(() => {
    getCryptoData()
    .then(data => cryptoDataDispatch(cryptosDataAction(data)))
    .catch(error => error)
  } , [])

  return (
    <>
       {/* <Slider/> */}
      {/* <CryptoTable/>  */}
      <Coin/>
    </>
  );
};

export default Info;
