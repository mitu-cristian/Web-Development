import {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import { getMyTickets, reset } from '../features/tickets/ticketSlice';
import {selectTicketSlice} from "../features/tickets/ticketSlice";
import SpinnerComponent from "../components/SpinnerComponent";
import {toast} from "react-toastify";
import TicketItemComponent from "../components/TicketItemComponent";
// IBM carbon components
import {Button, Table, TableHead, TableRow, TableHeader} from "@carbon/react";
import {SkeletonText} from "@carbon/react";

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
        return (
<>
    <section style={{margin: "40px"}}>
        <SkeletonText width="30%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
        <SkeletonText width="30%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
    </section>
    
    <Table>
      <TableHead>
          <TableRow>
              <TableHeader>Date</TableHeader>
              <TableHeader>Product</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader></TableHeader>
          </TableRow>
      </TableHead>
           <TicketItemComponent/>
           <TicketItemComponent/>
           <TicketItemComponent/>
    </Table>
</>
        )

  return (

<>
    <section className="heading">
        <h1>My tickets</h1>
    </section>
    
    <Table>
      <TableHead>
          <TableRow>
              <TableHeader>Date</TableHeader>
              <TableHeader>Product</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader></TableHeader>
          </TableRow>
      </TableHead>
            {tickets.map((ticket) => (<TicketItemComponent key={ticket._id} ticket = {ticket}/>))}
    </Table>
</>
  )
}

export default MyTicketsPage;