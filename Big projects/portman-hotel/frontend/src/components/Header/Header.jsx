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
    {user ? 
      (<button onClick={onLogout}>Logout</button>) : 
      (<div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
      </div>)
    }

    {bookingForm && <BookingFormHome/>}
  </>
  )
}

export default Header
