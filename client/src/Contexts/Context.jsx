import { useReducer , createContext } from "react";
import { userReducer } from "../Reducers/User-Reducer";
import { cryptoDataReducer } from "../Reducers/Crypto-Data-Reducer";
import { cryptoStatsReducer } from "../Reducers/Crypto-Stats-Reducer";

export const ReducersContext = createContext() ;

const ReducersProvider = ({children}) => {
   let [user , userDispatch] = useReducer(userReducer , {loggedIn:false}) ;
   let [cryptoData , cryptoDataDispatch] = useReducer(cryptoDataReducer , []) ;
   let [cryptoStats , cryptoStatsDispatch] = useReducer(cryptoStatsReducer , {}) ;
  return (
    <ReducersContext.Provider value={{user , userDispatch , cryptoData , cryptoDataDispatch , cryptoStats , cryptoStatsDispatch }}>
      {children}
    </ReducersContext.Provider>
  )
}

export default ReducersProvider ;