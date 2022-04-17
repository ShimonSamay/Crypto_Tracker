import { useState } from "react";
import Login from "../Features/Login/Login" ;
import Register from "../Features/Register/Register";
import Slider from "../Features/Slider/Slider";

const HomePage = () => {
  
  let [loginView , setLoginView] = useState(true) ;
  
  const changeScreen = () => {
    setLoginView(!loginView);
  }
  return (
    <>
    {
    loginView ? <Login setRegisterScreen={changeScreen}/> : <Register setLoginScreen={changeScreen}/> 
  }
<Slider/>
    </>
  )
}

export default HomePage ; 