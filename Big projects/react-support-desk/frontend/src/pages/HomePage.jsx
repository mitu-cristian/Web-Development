// react-icons
import {FaQuestionCircle, FaTicketAlt} from "react-icons/fa";
// React
import {useEffect} from "react";
// React-router-dom
import {Link, useNavigate} from "react-router-dom";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {selectTicketSlice, getTicketsSummary, reset} from "../features/tickets/ticketSlice";
import {selectAuthSlice} from "../features/auth/authSlice";
// components
import SpinnerComponent from "../components/SpinnerComponent";
import TicketItemComponent from "../components/TicketItemComponent";

const HomePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {tickets, isLoading, isError, isSuccess, message} = useSelector(selectTicketSlice);
  const recentNewTickets = tickets.recentNewTickets ? tickets.recentNewTickets : [];
  const recentClosedTickets = tickets.recentClosedTickets ? tickets.recentClosedTickets : [];
  const {user} = useSelector(selectAuthSlice);

  useEffect(() => {
    dispatch(getTicketsSummary());
  }, []);

  useEffect(() => {
    if(isError)
      toast.error(message);
    if(isSuccess) {
      return () => {
        dispatch(reset());
      }
    }
  }, [isError, message, isSuccess, dispatch]);

  if(isLoading)
    return <SpinnerComponent/>

  return (
    <>
        <section className="heading">
          <h1>Newly open issues</h1>
        </section>
          {recentNewTickets.map((ticket) => (<TicketItemComponent key = {ticket._id} ticket = {ticket}/>))}
        

        <section className="heading">
          <h2>Recent closed issues</h2>
        </section>
          {recentClosedTickets.map((ticket) => (<TicketItemComponent key = {ticket._id} ticket = {ticket}/>))}

        <section className="heading">
            <h1>What do you need help with?</h1>
            {/* <p>Please choose from an option below</p> */}
        </section>

        <Link to="/new-ticket" className="btn btn-fit-content btn-reverse">
            <FaQuestionCircle/> Create new ticket
        </Link>

        {user && 
          <Link to ="/my-tickets" className="btn btn-fit-content">
              <FaTicketAlt/> View my tickets 
          </Link>}
    </>
  )
}

export default HomePage;