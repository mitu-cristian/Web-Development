import {useSelector} from "react-redux";
import {selectNoteSlice} from "../features/notes/noteSlice";

const NoteComponent = ({note}) => {

    // const {notes} = useSelector(selectNoteSlice);
    // let username = notes.map((note) => note?._id === noteParam?._id);
    // console.log(username);

  return (
    <div className="note" style = {{backgroundColor: note?.isStaff ? "rgba(0,0,0,0.7" : "#fff",
    color: note?.isStaff ? "#fff" : "#000"}}>
        <h4>Note from {note?.isStaff ? <span>Staff</span> : <span> {note?.user?.name} </span>}</h4>
        <p>{note?.text}</p>
        <div className="note-date">
            {new Date(note?.createdAt).toLocaleString("en-US")}
        </div>
    </div> 
  )
}

export default NoteComponent