import { useContext, useEffect } from "react";
import { cryptosDataAction } from "../../Actions/Crypto-Data-Action";
import { ReducersContext } from "../../Contexts/Context";
import { getCryptoData } from "../../Services/Crypto-Data";
import Table from "../Features/Table/Table";
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
      <Slider/>
      <Table/>
    </>
  );
};

export default Info;
