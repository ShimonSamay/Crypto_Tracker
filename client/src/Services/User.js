import jwt_decode from "jwt-decode";
import { validatePasswords } from "../Utils/Utils-Functions";

const baseUrl = "http://localhost:4000/users" ;

export const registerHandler = async (user , setMessage) => {
    let options = {
        method: "POST" ,
        headers: { "Content-Type" : "application/json" } ,
        body: JSON.stringify(user)
    }
   return await fetch (`${baseUrl}/register` , options)
    .then(response => response.json())
    .then(response => {
      setMessage(response.message);
      setTimeout(() => {
        setMessage(null);
      } , 3000)
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
          setErrMessage(null)
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
        setErrMessage(null);
    } , 3000)
  }
}

