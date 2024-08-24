import {useSelector, useDispatch} from "react-redux";
import {getTicket, reset as ticketReset, closeTicket, selectTicketSlice} from "../features/tickets/ticketSlice";
import {getAllNotesForTicket, createNote, reset as noteReset, selectNoteSlice} from "../features/notes/noteSlice";
import {selectAuthSlice} from "../features/auth/authSlice";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
// Components
import SpinnerComponent from "../components/SpinnerComponent";
import NoteComponent from "../components/NoteComponent";
import Modal from "react-modal";
import {FaPlus} from "react-icons/fa";
import ModalComponent from "../components/ModalComponent";

// const customStyles = {
//   content: {
//     width: "600px",
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     position: "relative"
//   }
// }

// Modal.setAppElement("#root");

const TicketPage = () => {

  const {user} = useSelector(selectAuthSlice);
  const {ticket, isError: ticketIsError, isLoading: ticketIsLoading, isSuccess: ticketIsSuccess, message: ticketMessage} = useSelector(selectTicketSlice);
  const {notes, isLoading: noteIsLoading, isError: noteIsError, isSuccess: noteIsSuccess, message: noteMessage} = useSelector(selectNoteSlice);
  const dispatch = useDispatch();
  const {ticketId} = useParams();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [noteText, setNoteText] = useState("");

  // const onNoteSubmit = (event) => {
  //   event.preventDefault();
  //   dispatch(createNote({noteText, ticketId}));
  //   setModalIsOpen(false);
  //   setNoteText("");
  // }

  const onTicketClosed = () => {
    dispatch(closeTicket(ticketId));
    if(isSuccess)
      toast.success("Ticket closed");
  };

  useEffect(() => {
      dispatch(getTicket(ticketId));
      dispatch(getAllNotesForTicket(ticketId));
  }, []);

  useEffect(() => {
    if(ticketIsError) 
      toast.error(ticketMessage);
    if(noteIsError)
      toast.error(noteMessage);
    if(ticketIsSuccess && noteIsSuccess) {
      return () => {
        dispatch(ticketReset());
        dispatch(noteReset());
      }
    }
  }, [ticketIsError, ticketIsSuccess, ticketMessage, noteIsError, 
    noteIsSuccess, noteMessage, dispatch]);

  // useEffect(() => {
  //   if(ticketIsError)
  //     toast.error(ticketMessage);
  //   if(ticketIsSuccess) {
  //     return () => {
  //       dispatch(ticketReset());
  //     }
  //   }
  // }, [ticketIsError, ticketMessage, ticketIsSuccess, dispatch])

  if(ticketIsLoading || noteIsLoading) 
    return <SpinnerComponent/>

  // if(ticketIsLoading) 
  //   return <SpinnerComponent/>

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <h2>Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}> {ticket.status} </span>
        </h2>
        <header className="ticket-header">
          <h2>Name: {ticket?.user?.name && ticket.user.name}</h2>
        </header>
        <h3>Product: {ticket.product}</h3>
        <h4 style={{display: "inline"}}>Date submitted</h4> <p style = {{display: "inline"}}>{new Date(ticket.createdAt).toLocaleString("en-US") }</p>
        <div></div>
        <h4 style={{display: "inline"}}>Last update</h4> <p style={{display: "inline"}}>{new Date(ticket.updatedAt).toLocaleString("en-US")}</p>
        <hr />
        <div className="ticket-desc">
          <h3>Description of issue</h3>
          <p> {ticket.description} </p>
        </div>
       {notes.length > 0 && <h2>Notes</h2>}
      </header>

      {(ticket.status !== "closed" && user) && (
        <button className="btn" onClick = { () => setModalIsOpen(true)}> <FaPlus/> Add note</button>
      )}

      {/* <Modal isOpen = {modalIsOpen} onRequestClose = {() => setModalIsOpen(false)} style = {customStyles}
      contentLabel = "Add note">
          <h2>Add note</h2>
          <button className="btn-close" onClick = {() => setModalIsOpen(false)}>X</button>
          <form onSubmit = {onNoteSubmit}>
            <div className="form-group">
              <textarea name="noteText" id="noteText" className="form-control" placeholder="Note text" value = {noteText}
              onChange = {(event) => setNoteText(event.target.value)}></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">Submit</button>
            </div>
          </form>
      </Modal> */}

      <ModalComponent ticketId = {ticketId} modalIsOpen = {modalIsOpen} setModalIsOpen = {setModalIsOpen}/>

      {notes.map((note) => (<NoteComponent key = {note._id} note = {note}/>))}

      {(ticket.status !== "closed" && user?._id === ticket?.user?._id) && (
        <button className="btn btn-block btn-danger" onClick = {onTicketClosed} style={{width: "fit-content", margin: "0 auto"}}>Close ticket</button>
      )}
    </div>
  )
}

export default TicketPage;