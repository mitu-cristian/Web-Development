import "./tripleRoom.css";

// Import components
import Header from "../../../components/Header/Header";

function TripleRoom() {
  return (
    <>
      <Header bookingForm = {false}/>
      <div>Number of nights</div>
      <button>Book now!</button>
    </>
  )
}

export default TripleRoom
