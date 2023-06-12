import "./header.css";
import logo from "./images/logo.png";

import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from "../../features/auth/authSlice";
import {toast} from "react-toastify";

import BookingFormHome from "../BookingFormHome/BookingFormHome";

function Header({bookingForm}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, message, isError, isSuccess, isLoading} = useSelector((state) => state.auth)

  

  useEffect(() => {
    if(isError) 
    toast.error(message);
    
    if(!user && isSuccess ) {
      toast.success("You have logged out from your account.");
      navigate("/")
    }

    if(user && isSuccess)
      toast.success("You are logged in.");

    dispatch(reset())
  }, [isError, isSuccess, message, navigate, dispatch])

  const onLogout = () => {
    dispatch(logout());
  }

  return (
  <>
  <nav>
    <div className="container">
        <div className="logo">
            <img className="logo-image" src={logo}/>
            <Link to="/">Hotelul Portman</Link>
        </div>
        <div className="nav-buttons">

        <ul className="header">
            {user ? (
            <>
              <p>Bună, {user.firstname}!</p>
              <button onClick={onLogout}>Logout</button>
            </>
            ) : 
            <>  
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>}
        </ul>

        <ul className="nav">
            <li>
                <Link to="#">Camere</Link>
            </li>
            <li>
                <Link to="#">Restaurant</Link>
            </li>
            <li>
                <Link to="#">Contact</Link>
            </li>
        </ul>

        </div>
    </div>
</nav>
    {/* {user ? 
      (<button onClick={onLogout}>Logout</button>) : 
      (<div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
      </div>)
    } */}

    {bookingForm && <BookingFormHome/>}
  </>
  )
}

export default Header
