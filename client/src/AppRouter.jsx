import Home from "./Components/Pages/Home/Home";
import CryptosInfo from "./Components/Pages/Cryptos/Cryptos-Info";
import CryptoInfo from "./Components/Pages/Crypto/Crypto-info";
import ReducersProvider from "./Contexts/Context";
import ProtectedRoutes from "Components/Features/Protected Routes/Protected";
import { BrowserRouter, Route, Routes } from "react-router-dom";


const AppRouter = () => {
    return (
        <BrowserRouter>
         <ReducersProvider>
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route element={<ProtectedRoutes/>}>
                <Route exact path="/coins" element={<CryptosInfo/>}/>
                <Route exact path="/coin" element={<CryptoInfo/>}/>
              </Route>
          </Routes>
         </ReducersProvider>
       </BrowserRouter>
    )
};

export default AppRouter ;