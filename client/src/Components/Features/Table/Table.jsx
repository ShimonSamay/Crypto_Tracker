import "./Table.css";
import { useContext , useLayoutEffect, useState } from "react";
import { ReducersContext } from "../../../Contexts/Context";


 const Table = () => {

  const {cryptoData , cryptoStatsDispatch} = useContext(ReducersContext) ;
  const [tableData , setTableData] = useState([]) ;

  useLayoutEffect(() => {
   setTableData([...cryptoData]);
  } , [cryptoData]) 

  return (
    <section>
    </section>
  )
}

export default Table ;


