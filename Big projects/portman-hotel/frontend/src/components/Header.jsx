import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";
import {toast} from "react-toastify";

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, message, isError, isSuccess} = useSelector((state) => state.auth)

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
  </>
  )
}

export default Header
