import { useContext , useLayoutEffect } from "react";
import { cryptosDataAction } from "../../../Actions/Crypto-Data-Action";
import { ReducersContext } from "../../../Contexts/Context";
import { getCryptoData } from "../../../Services/Crypto-Data";
import CryptoTable from "../../Features/Table/Table";
import Slider from "../../Features/Slider/Slider";

const CryptosInfo = () => {

  const {cryptoDataDispatch} = useContext(ReducersContext);

  useLayoutEffect(() => {
    getCryptoData()
    .then(data => cryptoDataDispatch(cryptosDataAction(data)))
  } , [])

  return (
    <>
      <Slider/> 
      <CryptoTable/>  
    </>
  );
};

export default CryptosInfo;
