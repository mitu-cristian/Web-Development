import "./singleRoomComponent.css";

import {useNavigate} from "react-router-dom";

// Redux general
import {useSelector, useDispatch} from "react-redux"

function SingleRoomComponent() {

  const {form, result} = useSelector((state) => state.booking)
  
  // console.log(form.start, form.end)

  const startDate = new Date(form.start)
  const endDate = new Date(form.end)
  const nightsNo = (endDate.getTime() - startDate.getTime())/1000/60/60/24;

  const navigate = useNavigate();

  return (
    <div>
     SingleRoom is working
     <button>Book now</button>
     <div>Number of nights: {nightsNo}</div>
     <div>price: {result.price}</div>
     <button onClick={() => navigate("/single-room")} >Find more about this room</button>
    </div>
  )
}

export default SingleRoomComponent
