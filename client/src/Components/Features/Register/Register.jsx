import "./Register.css";
import { useState } from "react";
import { registerHandler } from "Services/User";

const Register = ({setLoginScreen}) => {

  const [newUser,setNewUser] = useState({}) ;

  const [message , setMessage] = useState("") ;
  
  const getInputValues = (e) => {
    newUser[e.target.name] = e.target.value;
  };

  const setMessageContent = (content) => {
    setMessage(content);
    setTimeout(() => {
      setMessage("");
        } , 3000)
  };

  const register = async (e) => {
      e.preventDefault();
      setNewUser({...newUser});
      const serverResponse = await registerHandler(newUser);
      setMessageContent(serverResponse.message);
      if (serverResponse.success) {
        setTimeout(() => {
          setLoginScreen();
        }, 3000);
  }
}

  return (
    <section className="Register-Container">
      <div className="form-wrapper">
        <h1>Register</h1>
        <form onSubmit={register}>
          <div className="form-item">
            <input onChange={getInputValues} className="Confirm-Input" type="text" name="firstName" required placeholder="First Name"/>
            <input onChange={getInputValues} className="Confirm-Input" type="text" name="lastName" required placeholder="Last Name"/>
            <input onChange={getInputValues} className="Confirm-Input" type="text" name="email" required placeholder="Email" />
            <input onChange={getInputValues} className="Confirm-Input" type="password" name="password" required placeholder="Password"/>
          </div>
          <div className="button-panel">
            <span>{message}</span>
            <button>REGISTER</button>
          </div>
          <div className="form-footer">
          <span onClick={setLoginScreen}>Login</span>
        </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
