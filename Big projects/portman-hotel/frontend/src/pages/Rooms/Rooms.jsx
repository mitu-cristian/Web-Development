import "./rooms.css";
import hotel_image from "../Home/images/hotel-image.jpg";
import single_room from "../../components/RoomsComponents/images/SingleRoom.jpg";
import double_room from "../../components/RoomsComponents/images/DoubleRoom.jpg";
import triple_room from "../../components/RoomsComponents/images/TripleRoom.jpg";

import Header from "../../components/Header/Header";
import BookingForm from "../../components/BookingForm/BookingForm";

function Rooms() {
  return (
    <>

    <div className="container">
        <div className="boxes-facilities">

            <div className="box-room">
                <img src={single_room} alt="" />
                <h2>Cameră single</h2>
            </div>

            <div className="box-room">
                <img src={double_room} alt="" />
                <h2>Cameră double</h2>
            </div>

            <div className="box-room">
                <img src={triple_room} alt="" />
                <h2>Cameră triple</h2>
            </div>

        </div>
    </div>
    </>
  )
}

export default Rooms
