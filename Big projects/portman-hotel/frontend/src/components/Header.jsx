import {Link, useNavigate} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";
import {toast} from "react-toastify";

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout());
      toast.success("You have successfully logged out from your account.");
    dispatch(reset());
    navigate("/");
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
