import "./Table.css";
import { useContext , useLayoutEffect , useRef, useState } from "react";
import { ReducersContext } from "../../../Contexts/Context";
import { cryptoStatsActions } from "../../../Actions/Crypto-Stats-Actions";
import { logoutAction } from "../../../Actions/User-Action";
import { destructureItem , addCommas } from "../../../Utils/Utils-Functions";
import { removeFromWishlist , addToWishlist } from "../../../Actions/User-Action";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Badge from '@mui/material/Badge';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

 const CryptoTable = () => {

  const {cryptoData , cryptoStatsDispatch , appNavigator , user , userDispatch} = useContext(ReducersContext);
  const [tableData , setTableData] = useState([]);
  const modalRef = useRef();
  
  useLayoutEffect(() => {
    cryptoData.length && setTableData(destructureItem(cryptoData.sort((a,b) => a.market_cap - b.market_cap)));
  } , [cryptoData]);

  const sortByCategory = (e) => {
    const {category} = e.target.dataset;
    setTableData(destructureItem(tableData.sort((a,b) => b[category] - a[category])));
  };
  
  const searchCryptoByName = (e) => {
     const {value} = e.target ;
     const matches = cryptoData.filter(crypto => crypto.name.toLowerCase().indexOf(value) > -1);
     matches.length && setTableData(destructureItem(matches));
  };

  const getCryptoStats = (crypto) => {
    cryptoStatsDispatch(cryptoStatsActions(crypto));
    appNavigator("/coin");
  };
 
  const addToFavorites = (crypto) => {
    userDispatch(addToWishlist(crypto));
  };

  const deleteFromFavorites = (crypto) => {
    userDispatch(removeFromWishlist(crypto));
  };

  const logout = () => {
    userDispatch(logoutAction());
  };

  const handleModal = () => {
    modalRef.current.open ?  modalRef.current.close() : modalRef.current.showModal() ;
  };
 
  return (
    <section className="Table-Container">
     <section className="Menu-container">
       <input onChange={searchCryptoByName} className="Table-Input" placeholder="Search any crypto ..."></input> {user.wishlist.length}
       <dialog ref={modalRef}>
        <p> Sure You Want to Exit ? </p>
        <section>
       <p onClick={logout}> &#9989;</p>
       <p onClick={handleModal}> &#10060;</p>
        </section>
       </dialog>
       <section>
          <LogoutOutlinedIcon className="logout" onClick={handleModal} />
          <Badge className="badge"  badgeContent={user.wishlist.length}>
           {!user.wishlist.length ? <StarOutlineIcon  style={{ color: 'white'}}  fontSize="small"/> :  <StarIcon fontSize="small" style={{ color: 'yellow' }}/>} 
          </Badge>
     </section>
    </section>
    <TableContainer className="Mui-Table-Container" sx={{width:"90vw" , height:"70vh" , margin:"2vw auto" }} component={Paper}>
      <Table stickyHeader aria-label="simple table" style={{backgroundColor:"transparent"}}>
        <TableHead>

          <TableRow >
            <TableCell>Coin</TableCell>
            <TableCell></TableCell>
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
               <img src={crypto.image}/><span>{crypto.name}</span>
              </TableCell>
              <TableCell align="right">
              <span>
            {
              user.wishlist.includes(crypto) ?
               <StarIcon fontSize="small" onClick={() => deleteFromFavorites(crypto)}  style={{ color: 'yellow' , cursor:"pointer"}}/>
              :
               <StarOutlineIcon fontSize="small" onClick={() => addToFavorites(crypto) } style={{ color: 'black' , cursor:"pointer"}}/>
             }  
             </span>
              </TableCell>
              <TableCell><QueryStatsIcon style={{cursor:"pointer"}} onClick={() => getCryptoStats(crypto)}/></TableCell>
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


