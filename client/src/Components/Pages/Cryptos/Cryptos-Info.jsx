import { useContext , useEffect } from "react";
import { cryptosDataAction } from "Actions/Crypto-Data-Action";
import { globalStatesContext } from "Contexts/Context";
import { getCryptoData } from "Services/Crypto-Data";
import CryptoTable from "Components/Features/Table/Table";
import Slider from "Components/Features/Slider/Slider";

const CryptosInfo = () => {

  const { cryptoDataDispatch } = useContext(globalStatesContext);

  const setCryptoData = async () => {
    const data = await getCryptoData();
    cryptoDataDispatch(cryptosDataAction(data))
  }

  useEffect(() => {
    setCryptoData()
  } , [])

  return (
    <>
      <Slider/> 
      <CryptoTable/>  
    </>
  );
};

export default CryptosInfo;
