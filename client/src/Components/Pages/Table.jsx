import { useState , useEffect } from "react";
import { getCryptoData } from "../../Services/Crypto-Data";

const CryptoTable = () => {

    let [cryptoData , setCryptoData ] = useState([]);
    
    useEffect(() => {
     getCryptoData()
     .then(res => console.log(res))
    } , [])

   return (
       <>
         <h1>crypto</h1>
       </>
   )
}

export default CryptoTable ;