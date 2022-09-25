import "./Login.css";
import jwt_decode from "jwt-decode";
import { useContext , useRef , useState } from "react";
import { globalStatesContext } from "Contexts/Context";
import { loginAction } from "Actions/User-Action";
import { loginHandler } from "Services/User";
import { validatePasswords } from "Utils/Utils-Functions";


const Login = ({setRegisterScreen}) => {

   const { user, userDispatch , appNavigator } = useContext(globalStatesContext);

   const [errorMessage , setErrorMessage] = useState("") ;
   
   const inputRef = useRef();

   const getInputValues = (e) => {
    user[e.target.name] = e.target.value;
  };

  const notifyAboutError = (content) => {
    setErrorMessage(content);
    setTimeout(() => {
      setErrorMessage("");
          } , 3000)
  };

   const login = async (e) => {
      e.preventDefault();
      const matchedPasswords = validatePasswords(user, inputRef.current.value)
      if (!matchedPasswords) return notifyAboutError("Password confirmation failed ...");
      const serverResponse = await loginHandler(user);
      if (!serverResponse.token) return notifyAboutError(serverResponse.message);
      const decoded = jwt_decode(serverResponse.token);
      userDispatch(loginAction(decoded.user));
      appNavigator("/coins");
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
            <span>{errorMessage}</span>
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
