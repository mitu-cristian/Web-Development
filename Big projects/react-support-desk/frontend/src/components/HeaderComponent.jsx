import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {selectAuthSlice} from "../features/auth/authSlice";
import { logout, reset} from "../features/auth/authSlice";

const Header = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(selectAuthSlice);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    }
  return (
    <header className="header">
        <div className="logo">
            <Link to= "/">Support Desk</Link>
        </div>
        <ul>
           {user ? 
        <li>
            <button className="btn" onClick = {onLogout}> <FaSignInAlt/>Logout </button>
        </li>
           : (<>  <li>
                <Link to = "/login"> <FaSignInAlt/> Login </Link>
            </li>
            <li>
                <Link to = "/register"> <FaUser/> Register </Link>
            </li> </>) }
        </ul>
    </header>
  )
}

export default Header