import jwt_decode from "jwt-decode";
import { validatePasswords } from "../Utils/Utils-Functions";

const baseUrl = process.env.NODE_ENV === 'production' ?  
"https://coin-verse.herokuapp.com/users" : 'http://localhost:6500/users';


export const registerHandler = async (user , setMessage) => {
    let options = {
        method: "POST" ,
        headers: { "Content-Type" : "application/json" } ,
        body: JSON.stringify(user)
    } 
   return await fetch (`${baseUrl}/register` , options )
    .then(response => response.json())
    .then(response => {
      console.log({response});
       setMessage(response.message);
       setTimeout(() => {
        setMessage("")
       } , 3000);
    })
    .catch(error => error)
};

export const loginHandler = async (user , dispatch , action , setErrMessage , passwordToConfirm , navigate) => {
   if (validatePasswords(user , passwordToConfirm)) {
    let options = {
        method: "POST" ,
        headers: { "Content-Type" : "application/json" } ,
        body: JSON.stringify(user)
    }
    return await fetch (`${baseUrl}/login` , options)
    .then(response => response.json())
    .then(response => {
     if (!response.success ) {
        setErrMessage(response.message) ;
        setTimeout(() => {
          setErrMessage("")
        } , 3000) ;
     }
      const decoded = jwt_decode(response.token);
      dispatch(action(decoded.user));
      navigate("/coins");
    })
    .catch(error => error)
}
  else {
    setErrMessage("Password confirmation failed ...");
    setTimeout(() => {
        setErrMessage("");
    } , 3000)
  }
}

