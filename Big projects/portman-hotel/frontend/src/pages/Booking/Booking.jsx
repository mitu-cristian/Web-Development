import "./booking.css"

// import components
import Header from "../../components/Header/Header";
import SingleRoomComponent from "../../components/RoomsComponents/SingleRoomComponent/SingleRoomComponent";
import DoubleRoomComponent from "../../components/RoomsComponents/DoubleRoomComponent/DoubleRoomComponent";
import TripleRoomComponent from "../../components/RoomsComponents/TripleRoomComponent/TripleRoomComponent";

import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux for the booking store

function Booking() {

  const {result} = useSelector((state) => state.booking)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Header bookingForm = {true} />

      {(result != null && Object.keys(result).length === 0) && <div>For your requirement there is no room.</div>}
      {result == null && <div>Book now</div>}

      {(result && result.name == "SingleRoom") && <SingleRoomComponent/>}
      {(result && result.name == "DoubleRoom") && <DoubleRoomComponent/>}
      {(result && result.name == "TripleRoom") && <TripleRoomComponent/>}
    </>
  )
}

export default Booking
