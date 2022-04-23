import "./Table.css";
import { useContext , useLayoutEffect , useState } from "react";
import { ReducersContext } from "../../../Contexts/Context";
import { cryptoStatsActions } from "../../../Actions/Crypto-Stats-Actions";
import { destructureItem , addCommas } from "../../../Utils/Utils-Functions";
import { removeFromWishlist , addToWishlist } from "../../../Actions/User-Action";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';


 const CryptoTable = () => {

  const {cryptoData , cryptoStatsDispatch , appNavigator , user , userDispatch} = useContext(ReducersContext) ;
  const [tableData , setTableData] = useState([]) ;
  
  useLayoutEffect(() => {
    cryptoData.length && setTableData(destructureItem(cryptoData.sort((a,b) => a.market_cap - b.market_cap)));
  } , [cryptoData])

  const sortByCategory = (e) => {
    const {category} = e.target.dataset;
    setTableData(destructureItem(tableData.sort((a,b) => b[category] - a[category])));
  }
  
  const searchCryptoByName = (e) => {
     const {value} = e.target ;
     const matches = cryptoData.filter(crypto => crypto.name.toLowerCase().indexOf(value) > -1);
     matches.length && setTableData(destructureItem(matches));
  }

 const getCryptoStats = (crypto) => {
  cryptoStatsDispatch(cryptoStatsActions(crypto));
  appNavigator("/coin");
 };
 
const AddToFavorites = (crypto) => {
 userDispatch(addToWishlist(crypto));
}

 const deleteFromFavorites = (crypto) => {
  userDispatch(removeFromWishlist(crypto));
 }
 
  return (
    <section className="Table-Container">
     <section className="Menu-container">
     <input onChange={searchCryptoByName} className="Table-Input" placeholder="Search any crypto ..."></input> <p style={{color:"red"}}>{user.wishlist.length > 0 && user.wishlist.length }</p>
    </section>
    <TableContainer className="Mui-Table-Container" sx={{width:"90vw" , height:"70vh" , margin:"2vw auto" }} component={Paper}>
      <Table stickyHeader aria-label="simple table" style={{backgroundColor:"transparent"}}>
        <TableHead style={{backgroundColor:"gold"}}>

          <TableRow >
            <TableCell>Coin</TableCell>
            <TableCell></TableCell>
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
              <TableCell align="right">
              <span>
            {
              user.wishlist.includes(crypto) ?
               <FavoriteIcon className="icons"  fontSize="small" onClick={() => deleteFromFavorites(crypto)}  style={{ color: 'red' , cursor:"pointer" }}/>
              :
               <AddIcon className="icons"  fontSize="small" onClick={() => AddToFavorites(crypto) } style={{ color: 'inherit' , cursor:"pointer" }}/>
             }
             </span>
              
              </TableCell>
              <TableCell align="right">{addCommas(crypto.market_cap)}$</TableCell>
              <TableCell align="right">{addCommas(crypto.current_price)}$</TableCell>
              <TableCell align="right">{addCommas(crypto.high_24h)}$</TableCell>
              <TableCell align="right">{addCommas(crypto.low_24h)}$</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </section>
  )
}

export default CryptoTable ;


