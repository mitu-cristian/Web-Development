import {Link} from "react-router-dom";
import "./CSS/ticketItemComponent.css";

const TicketItemComponent = ({ticket}) => {
  return (
    <div className="ticket-container">
    <div className="ticket-headings">
        <div>Date</div>
        <div>Product</div>
        <div>Status</div>
    </div>

    <div className="ticket">
        <div> {new Date(ticket.createdAt).toLocaleString("en-US")} </div>
        <div> {ticket.product} </div>
        <div className = {`status status-${ticket.status}`}> {ticket.status} </div>
        <Link to = {`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">View</Link>
    </div>
    <div className="ticket-description">
      <div>Description </div>
      <p> {ticket.description.length > 300 ? ticket.description.substring(0, 300) + "..." : ticket.description} </p>
    </div>
    </div>
  )
}

export default TicketItemComponent;