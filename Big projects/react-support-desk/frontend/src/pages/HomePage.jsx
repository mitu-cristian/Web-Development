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
// IBM carbon components
import {Button, Table, TableHead, TableRow, TableHeader} from "@carbon/react";
import {ButtonSkeleton, SkeletonText} from "@carbon/react";

const HomePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {tickets, isLoading: ticketIsLoading, isError: ticketIsError, isSuccess: ticketIsSuccess, message: ticketMessage} = useSelector(selectTicketSlice);
  const recentNewTickets = tickets.recentNewTickets ? tickets.recentNewTickets : [];
  const recentClosedTickets = tickets.recentClosedTickets ? tickets.recentClosedTickets : [];
  const {user} = useSelector(selectAuthSlice);

  useEffect(() => {
    dispatch(getTicketsSummary());
  }, []);

  useEffect(() => {
    if(ticketIsError)
      toast.error(ticketMessage);
    if(ticketIsSuccess) {
      return () => {
        dispatch(reset());
      }
    }
  }, [ticketIsError, ticketMessage, ticketIsSuccess, dispatch]);
  
  if(ticketIsLoading)
    return (
      <>

    <section className="heading">
      <SkeletonText width="50%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
    </section>

    <Link to="/new-ticket" className="btn btn-fit-content btn-reverse">
      <ButtonSkeleton style={{marginBottom: "30px"}}> </ButtonSkeleton>
    </Link>

    {user && 
      <Link to ="/my-tickets" className="btn btn-fit-content">
        <ButtonSkeleton></ButtonSkeleton>
          </Link>}

    <section className="heading">
      <SkeletonText width="50%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
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

    <section className="heading" style={{marginTop: "30px"}}>
      <SkeletonText width="50%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
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
    );

  return (
  <>

    <section className="heading">
      <h1>What do you need help with?</h1>
    </section>

    <Link to="/new-ticket" className="btn btn-fit-content btn-reverse">
      <Button style={{marginBottom: "30px"}}>Create new ticket</Button>
    </Link>

    {user && 
      <Link to ="/my-tickets" className="btn btn-fit-content">
        <Button>View my tickets</Button>
          </Link>}

    <section className="heading">
      <h1>New open issues</h1>
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

      {recentNewTickets.map((ticket) => (<TicketItemComponent key = {ticket._id} ticket = {ticket}/>))}    

    </Table>

    <section className="heading" style={{marginTop: "30px"}}>
      <h1>Recent closed issues</h1>
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

      {recentClosedTickets.map((ticket) => (<TicketItemComponent key = {ticket._id} ticket = {ticket}/>))}    

    </Table>


    </>
  )
}

export default HomePage;