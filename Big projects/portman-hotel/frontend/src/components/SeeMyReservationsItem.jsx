import {useEffect} from "react";
import {toast} from "react-toastify";

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux for the reservation store
import {cancelMyReservation, resetRe} from "../features/reservation/reservationSlice";

function SeeMyReservationsItem({reservation}) {

    const {isSuccessRe, isErrorRe, messageRe} = useSelector((state) => state.reservation)
    const dispatch = useDispatch();

// Format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    return formattedDate;
  }

  const buttonCancelMyReservation = (reservationId) => {
    dispatch(cancelMyReservation(reservationId))
    console.log("reservationId ", reservationId)
    // const encoder = new TextEncoder();
    // const encodedString = encoder.encode(reservationId)
    // const byteSize = encodedString.byteLength;
    // console.log(byteSize)
  }

  return (
    <section key={reservation._id}>

        <div >
            price: {reservation.price} 
        </div>

        <div>
            adults: {reservation.adults}
        </div>

        <div>
            children: {reservation.children}
        </div>

        <div>
            room number: {reservation.roomNumber}
        </div>

        <div>
            start date: {formatDate(reservation.startDate)}
        </div>

        <div>
            end date: {formatDate(reservation.endDate)}
        </div>

        <div>
            status: {reservation.status}
        </div>

        <button onClick = {() => dispatch(cancelMyReservation(reservation._id))}>X</button>

        <br></br>
    </section>
  )
}

export default SeeMyReservationsItem
