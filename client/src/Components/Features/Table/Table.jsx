import "./Table.css";
import { useContext , useLayoutEffect , useState } from "react";
import { ReducersContext } from "../../../Contexts/Context";
import { cryptoStatsActions } from "../../../Actions/Crypto-Stats-Actions";
import { getSingleCoin } from "../../../Services/Crypto-Data";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';


 const CryptoTable = () => {

  const {cryptoData , cryptoStats, cryptoStatsDispatch} = useContext(ReducersContext) ;
  const [tableData , setTableData] = useState([]) ;
  
  useLayoutEffect(() => {
   setTableData([...cryptoData.sort((a,b) => a.market_cap - b.market_cap)]);
  } , [cryptoData])

  const sortByCategory = (e) => {
    const {category} = e.target.dataset ;
    setTableData([...tableData.sort((a,b) => b[category] - a[category])]);
  }
  
  const searchCryptoByName = (e) => {
     const {value} = e.target ;
     const matches = cryptoData.filter(crypto => crypto.name.toLowerCase().indexOf(value) > -1);
     matches.length && setTableData([...matches]);
  }

 const getCryptoStats = (crypto) => {
  cryptoStatsDispatch(cryptoStatsActions(crypto));
 }
 
  return (
    <section className="Table-Container">
     <section className="Menu-container">
     <input onChange={searchCryptoByName} className="Table-Input" placeholder="Search any crypto ..."></input>
    </section>
    <TableContainer className="Mui-Table-Container" sx={{width:"90vw" , height:"70vh" , margin:"2vw auto" }} component={Paper}>
      <Table stickyHeader aria-label="simple table" style={{backgroundColor:"transparent"}}>
        <TableHead style={{backgroundColor:"gold"}}>

          <TableRow >
            <TableCell>Coin</TableCell>
            <Tooltip className="window" title="Sort By Market Cup" placement="top-end" arrow>
            <TableCell onClick={sortByCategory} data-category="market_cap" align="right">Market Cup</TableCell>
            </Tooltip>

            <Tooltip className="window" title="Sort By Current Price" placement="top-end" arrow>
             <TableCell onClick={sortByCategory}  data-category="current_price" align="right">Current Price</TableCell>
            </Tooltip>

            <Tooltip className="window" title="Sort By High 24 Price" placement="top-end" arrow>
              <TableCell onClick={sortByCategory}   data-category="high_24h" align="right">High 24 Hours</TableCell>
            </Tooltip>
           
           <Tooltip className="window" title="Sort By Low 24 Price" placement="top-end" arrow>
            <TableCell onClick={sortByCategory}  data-category="low_24h"  align="right">Low 24 Hours</TableCell>
            </Tooltip>
          </TableRow>

        </TableHead>
        <TableBody>
          {tableData.map(crypto => 
            <TableRow  style={{textAlign:"center"}} 
              key={crypto.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{display:"flex", alignItems:"center"}}>
               <img onClick={() => getCryptoStats(crypto)} src={crypto.image}/><span>{crypto.name}</span>
              </TableCell>
              <TableCell align="right">{crypto.market_cap.toLocaleString('en-US')}$</TableCell>
              <TableCell align="right">{crypto.current_price.toLocaleString('en-US')}$</TableCell>
              <TableCell align="right">{crypto.high_24h.toLocaleString('en-US')}$</TableCell>
              <TableCell align="right">{crypto.low_24h.toLocaleString('en-US')}$</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </section>
  )
}

export default CryptoTable ;


