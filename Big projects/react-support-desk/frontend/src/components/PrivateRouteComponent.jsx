import {Navigate, Outlet} from "react-router-dom";
import {useAuthStatus} from "../hooks/useAuthStatus";
import Spinner from "./SpinnerComponent";

const PrivateRouteComponent = () => {

    const {loggedIn, checkingStatus} = useAuthStatus();

    if(checkingStatus)
        return <Spinner/>

  return (
    loggedIn ? <Outlet/> : <Navigate to = "/login"/>
  )
}

export default PrivateRouteComponent;