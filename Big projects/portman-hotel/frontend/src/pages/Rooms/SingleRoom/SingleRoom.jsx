import "./singleRoom.css";

// import components
import Header from "../../../components/Header/Header";

function SingleRoom() {
  return (
    <>
      <Header bookingForm={false}/>
      <div>Number of nights</div>
      <button>Book now!</button>
    </>
  )
}

export default SingleRoom
