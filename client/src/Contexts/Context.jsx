import { useReducer , createContext } from "react";
import { userReducer } from "Reducers/User-Reducer";
import { cryptoDataReducer } from "Reducers/Crypto-Data-Reducer";
import { cryptoStatsReducer } from "Reducers/Crypto-Stats-Reducer";
import { useNavigate } from "react-router";

export const globalStatesContext = createContext() ;

const GlobalStatesProvider = ({ children}) => {

   const [user , userDispatch] = useReducer(userReducer , {loggedIn:false}) ;
   const [cryptoData , cryptoDataDispatch] = useReducer(cryptoDataReducer , []) ;
   const [cryptoStats , cryptoStatsDispatch] = useReducer(cryptoStatsReducer , {}) ;
   const appNavigator = useNavigate();

   const globalStates = {
    user , userDispatch ,
    cryptoData , cryptoDataDispatch ,
    cryptoStats , cryptoStatsDispatch ,
    appNavigator 
   }

  return (
    <globalStatesContext.Provider value={globalStates}>
      {children}
    </globalStatesContext.Provider>
  )
}

export default GlobalStatesProvider ;