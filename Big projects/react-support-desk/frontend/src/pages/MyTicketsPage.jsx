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
        <h1>My tickets</h1>
            {tickets.map((ticket) => (<TicketItemComponent key={ticket._id} ticket = {ticket}/>))}
    </>
  )
}

export default MyTicketsPage;