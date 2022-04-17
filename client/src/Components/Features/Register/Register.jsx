import "./Register.css";
import { useState } from "react";
import { handleRegister } from "../../../Services/User";

const Register = ({setLoginScreen}) => {

  const [newUser , setNewUser] = useState({}) ;
  
  const getInputValues = (e) => {
    newUser[e.target.name] = e.target.value;
  };

  const registerUser = (e) => {
    e.preventDefault();
    setNewUser({...newUser});
    handleRegister(newUser)
  };

  return (
    <section className="Register-Container">
      <div className="form-wrapper">
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <div className="form-item">
            <input onChange={getInputValues} className="Confirm-Input" type="text" name="firstName" required placeholder="First Name"/>
            <input onChange={getInputValues} className="Confirm-Input" type="text" name="lastName" required placeholder="Last Name"/>
            <input onChange={getInputValues} className="Confirm-Input" type="text" name="email" required placeholder="Email" />
            <input onChange={getInputValues} className="Confirm-Input" type="password" name="password" required placeholder="Password"/>
          </div>
          <div className="button-panel">
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
