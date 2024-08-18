import {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import { getMyTickets, reset } from '../features/tickets/ticketSlice';
import {selectTicketSlice} from "../features/tickets/ticketSlice";
import SpinnerComponent from "../components/SpinnerComponent";
import {toast} from "react-toastify";
import TicketItemComponent from "../components/TicketItemComponent";

const MyTicketsPage = () => {

    const dispatch = useDispatch();
    const {tickets, isLoading, isError, isSuccess, message} = useSelector(selectTicketSlice);

    useEffect(() => {
        dispatch(getMyTickets());
    }, []);

    useEffect(() => {
        if(isError)
            toast.error(message);
        if(isSuccess) {
            return () => {
                dispatch(reset());
            }
        }
    }, [isError, message, isSuccess, dispatch])

    if(isLoading)
        return <SpinnerComponent/>

  return (
    <>
        <h1>Tickets</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                <div>Product</div>
                <div>Status</div>
                <div></div>
            </div>
            {tickets.map((ticket) => (<TicketItemComponent key={ticket._id} ticket = {ticket}/>))}
        </div>
    </>
  )
}

export default MyTicketsPage;