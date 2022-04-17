import jwt_decode from "jwt-decode";
import { validatePasswords } from "../Utils/Validate-Password";

const baseUrl = "http://localhost:4000/users" ;

export const handleRegister = async (user) => {
    let options = {
        method: "POST" ,
        headers: { "Content-Type" : "application/json" } ,
        body: JSON.stringify(user)
    }
   return await fetch (`${baseUrl}/register` , options)
    .then(response => response.json())
    .catch(error => error)
};

export const handleLogIn = async (user , dispatch , action , setErrMessage , passwordToConfirm) => {
   if (validatePasswords(user , passwordToConfirm)) {
    setErrMessage(false);
    let options = {
        method: "POST" ,
        headers: { "Content-Type" : "application/json" } ,
        body: JSON.stringify(user)
    }
    return await fetch (`${baseUrl}/login` , options)
    .then(response => response.json())
    .then(response => {
      const decoded = jwt_decode(response.token);
      dispatch(action(decoded.user));
    })
    .catch(error => error)
}
  else {
    setErrMessage(true);
    setTimeout(() => {
        setErrMessage(false);
    } , 3000)
  }
}

