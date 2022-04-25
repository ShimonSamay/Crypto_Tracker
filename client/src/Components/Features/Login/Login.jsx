import "./Login.css";
import { useContext , useRef , useState } from "react";
import { ReducersContext } from "../../../Contexts/Context";
import { loginAction } from "../../../Actions/User-Action";
import { loginHandler } from "../../../Services/User";


const Login = ({setRegisterScreen}) => {

   const { user, userDispatch , appNavigator } = useContext(ReducersContext);
   const [message , setMessage] = useState("") ;
   const inputRef = useRef();

   const getInputValues = (e) => {
    user[e.target.name] = e.target.value;
  };

   const login = (e) => {
    e.preventDefault();
    loginHandler(user , userDispatch , loginAction , setMessage , inputRef.current.value , appNavigator)
  };
 
  return (
    <section className="Login-Container">
      <div className="form-wrapper">
        <h1>Login</h1>
        <form onSubmit={login}>
          <div className="form-item">
            <input onChange={getInputValues} className="Confirm-Input" type="text" name="email" required placeholder="Email"/>
            <input onChange={getInputValues} className="Confirm-Input" minLength={5} type="password" name="password" required placeholder="Password"/>
            <input ref={inputRef} className="Confirm-Input" type="password" name="confirmPassword" required="required" placeholder="Confirm Password"/>
          </div>
          <div className="button-panel">
            <span>{message}</span>
            <button>Login</button>
          </div>
        </form>
        <div className="form-footer">
          <span onClick={setRegisterScreen}>Create an account</span>
        </div>
      </div>
    </section>
  );
};

export default Login;
