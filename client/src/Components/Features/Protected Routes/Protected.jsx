import Home from "../../Pages/Home/Home";
import { useContext } from "react"
import { Outlet } from "react-router";
import { ReducersContext } from "../../../Contexts/Context"

const ProtectedRoutes = () => {
  const {user} = useContext(ReducersContext) ;
  return (
    user.loggedIn ? <Outlet/> : <Home/>
  )
}

export default ProtectedRoutes ;