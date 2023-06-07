import "./doubleRoom.css";

// import components
import Header from "../../../components/Header/Header"

function DoubleRoom() {
  return (
    <>
      <Header bookingForm = {false}/>
      <div>Number of nights</div>
      <button>Book now!</button>
    </>
  )
}

export default DoubleRoom
