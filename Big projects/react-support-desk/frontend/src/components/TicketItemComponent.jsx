import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectTicketSlice} from "../features/tickets/ticketSlice";
import {TableRow, TableBody, TableCell, Button, Tag} from "@carbon/react";
import {ButtonSkeleton,  DataTableSkeleton} from "@carbon/react";
import "./CSS/ticketItemComponent.css";

const TicketItemComponent = ({ticket}) => {

  const {isLoading: ticketIsLoading} = useSelector(selectTicketSlice);

  if(ticketIsLoading) 
    return (
      <>
    <TableBody>
      <TableRow>
          <TableCell> <ButtonSkeleton style={{margin: "10px"}}/></TableCell>
          <TableCell> <ButtonSkeleton style={{margin: "10px"}} /> </TableCell>
          <TableCell> <ButtonSkeleton style={{margin: "10px"}} /> </TableCell>
          <TableCell> <ButtonSkeleton style={{margin: "10px"}}/> </TableCell>
          <TableCell> <ButtonSkeleton style={{margin: "10px"}}/> </TableCell>
      </TableRow>
  </TableBody>
      </>
    )
  
    return (
  <TableBody>
      <TableRow>
          <TableCell> {new Date(ticket.createdAt).toLocaleString("en-US")} </TableCell>
          <TableCell> {ticket.product} </TableCell>
          <TableCell> <Tag type={ticket.status == "new" ? "green" : "red"}> {ticket.status}</Tag> </TableCell>
          <TableCell> {ticket.description.length > 300 ? ticket.description.substring(0, 300) + "..." : ticket.description} </TableCell>
          <TableCell>
            <Link to= {`/ticket/${ticket._id}`} ><Button kind="ghost">View</Button></Link>  
          </TableCell>
      </TableRow>
  </TableBody>
  )
}

export default TicketItemComponent;