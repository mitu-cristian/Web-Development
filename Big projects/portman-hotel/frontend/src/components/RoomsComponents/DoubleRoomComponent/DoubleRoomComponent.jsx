import "./doubleRoomComponent.css"

import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux from booking store
import {getSingleRoom} from "../../../features/booking/bookingSlice";

// Import component
import Reserve from "../../Reserve/Reserve";

function DoubleRoomComponent() {

  const {rooms, isLoadingFo} = useSelector((state) => state.booking)
  const {form, result} = useSelector((state) => state.booking)
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startDate = new Date(form.start);
  const endDate = new Date(form.end);
  const nightsNo = (endDate.getTime() - startDate.getTime())/1000/60/60/24;

  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    // if(user) {

    // }
    // else 
    //   toast.warn("You must log in / register in order to be able to book online a room.")
    dispatch(getSingleRoom(result.roomId))
    setOpenModal(!openModal)
  }

  if(isLoadingFo)
    return <div>Loading...</div>

  return (
    <div>
      DoubleRoomComponent is working
      <div>Number of nights: {nightsNo}</div>
      <div>price: {result.price}</div>
      <button onClick = {() => navigate("/double-room")}>Find more about this room.</button>
      <button onClick={handleClick}>Book now</button>

      {openModal && <Reserve setOpen = {setOpenModal} roomId = {result.roomId}/>}
    </div>
  )
}

export default DoubleRoomComponent
