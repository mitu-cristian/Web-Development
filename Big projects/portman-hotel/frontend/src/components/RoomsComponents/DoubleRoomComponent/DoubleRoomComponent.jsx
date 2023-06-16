import "./doubleRoomComponent.css"

import {useState} from "react";

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux from booking store
import {getSingleRoom} from "../../../features/booking/bookingSlice";

// Import component
import Reserve from "../../Reserve/Reserve";

function DoubleRoomComponent() {

  const {isLoadingFo} = useSelector((state) => state.booking)
  const {form, result} = useSelector((state) => state.booking)

  const dispatch = useDispatch();

  let nightsNo;

  if(form) {
    const startDate = new Date(form.start);
    const endDate = new Date(form.end);
    nightsNo = (endDate.getTime() - startDate.getTime())/1000/60/60/24;
  }

  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    dispatch(getSingleRoom(result.roomId))
    setOpenModal(!openModal)
  }

  if(isLoadingFo)
    return <div>Loading...</div>

  return (
    <div>
      DoubleRoomComponent is working
      <div>Numărul de nopți: {nightsNo}</div>
      <div>Prețul: {result.price}</div>
      {/* <button onClick = {() => navigate("/double-room")}>Find more about this room.</button> */}
      <button onClick={handleClick}>Rezervă</button>

      {openModal && <Reserve setOpen = {setOpenModal} roomId = {result.roomId}/>}
    </div>
  )
}

export default DoubleRoomComponent
