import { useContext } from "react"
import { Outlet } from "react-router";
import Home from "Components/Pages/Home/Home";
import { globalStatesContext } from "Contexts/Context"

const ProtectedRoutes = () => {
  
  const { user } = useContext(globalStatesContext) ;

  return (
    user.loggedIn ? <Outlet/> : <Home/>
  )
}

export default ProtectedRoutes ;