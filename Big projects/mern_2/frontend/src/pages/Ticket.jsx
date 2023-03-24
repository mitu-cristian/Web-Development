import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getTicket, reset} from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import {toast} from 'react-toastify';

function Ticket() {

  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
  const dispatch = useDispatch()
  const {ticketId} = useParams()

  useEffect(() => {
  // the message is coming from the state
    if(isError) 
      toast(message)
    dispatch(getTicket(ticketId))
  }, [isError, message])

  return (
    <div>
        Ticket
    </div>
  )
}

export default Ticket
