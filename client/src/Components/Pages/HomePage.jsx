import { useState } from "react";
import Login from "../Features/Login/Login" ;
import Register from "../Features/Register/Register";

const HomePage = () => {
  
  let [loginView , setLoginView] = useState(true) ;
  
  const changeScreen = () => {
    setLoginView(!loginView);
  }
  return (
    loginView ? <Login setRegisterScreen={changeScreen}/> : <Register setLoginScreen={changeScreen}/> 
  )
}

export default HomePage