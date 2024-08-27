import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {createNote, selectNoteSlice, reset} from "../features/notes/noteSlice";
import Modal from "react-modal";
import SpinnerComponent from "./SpinnerComponent";
import {Button} from "@carbon/react";

const customStyles = {
    content: {
        width: "600px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        position: "relative"
    }
};

Modal.setAppElement("#root");

const ModalComponent = ({ticketId, modalIsOpen, setModalIsOpen}) => {

    const {isLoading, isError, isSuccess, message} = useSelector(selectNoteSlice);
    const dispatch = useDispatch();

    const [noteText, setNoteText] = useState("");

    // useEffect(() => {
    //     if(isError)
    //         toast.error(message);
    //     else if(isSuccess) {
    //         return () => {
    //             dispatch(reset());
    //         }
    //     }
    // }, [isError, isSuccess, message, dispatch]);

    const onNoteSubmit = (event) => {
        event.preventDefault();
        dispatch(createNote({noteText, ticketId}));
        setModalIsOpen(false);
        setNoteText("");
    }

    if(isLoading) 
        return <SpinnerComponent/>

    return (
        <Modal isOpen = {modalIsOpen} onRequestClose = {() => setModalIsOpen(false)} style = {customStyles}
        currentLabel = "Add Note">
            <h2>Add note</h2>
            <button className="btn-close" onClick = {() => setModalIsOpen(false)}>X</button>
            <form onSubmit = {onNoteSubmit}>
                <div className="form-group">
                    <textarea name="noteText" id="noteText" className="form-control" placeholder="Note text" value = {noteText}
                        onChange = {(event) => setNoteText(event.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <Button kind = "secondary" type="submit">Submit</Button>
                </div>
            </form>
        </Modal>
    )
}

export default ModalComponent;