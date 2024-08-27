import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {selectAuthSlice} from "../features/auth/authSlice";
import {selectTicketSlice} from "../features/tickets/ticketSlice";
import {selectNoteSlice} from "../features/notes/noteSlice";
import { logout, reset} from "../features/auth/authSlice";

import {Button} from "@carbon/react";
import {ButtonSkeleton} from "@carbon/react";

const Header = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isLoading: userIsLoading} = useSelector(selectAuthSlice);
    const {isLoading: ticketIsLoading} = useSelector(selectTicketSlice);
    const {isLoading: noteIsLoading} = useSelector(selectNoteSlice);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    }

    if(userIsLoading || ticketIsLoading || noteIsLoading) 
        return (
            <header className="header">
            <div className="logo">
                <Link to= "/">Support Desk</Link>
            </div>
            <ul>
               {user ? 
            <li>
                <ButtonSkeleton className="btn" onClick = {onLogout}>  </ButtonSkeleton>
            </li>
               : (<>  <li>
                    <Link to = "/login"> <ButtonSkeleton> </ButtonSkeleton> </Link>
                </li>
                <li>
                    <Link to = "/register"> <ButtonSkeleton> </ButtonSkeleton> </Link>
                </li> </>) }
            </ul>
        </header>
        );
 
  return (
    <header className="header">
        <div className="logo">
            <Link to= "/">Support Desk</Link>
        </div>
        <ul>
           {user ? 
        <li>
            <Button className="btn" onClick = {onLogout}> Logout </Button>
        </li>
           : (<>  <li>
                <Link to = "/login"> <Button> Login</Button> </Link>
            </li>
            <li>
                <Link to = "/register"> <Button>Register</Button> </Link>
            </li> </>) }
        </ul>
    </header>
  )
}

export default Header;