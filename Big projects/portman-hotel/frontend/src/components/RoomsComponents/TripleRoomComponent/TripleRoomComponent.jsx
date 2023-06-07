import "./tripleRoomComponent.css"

import {useNavigate} from "react-router-dom";

// Redux general
import {useSelector, useDispatch} from "react-redux";

function TripleRoomComponent() {

  const {form, result} = useSelector((state) => state.booking)

  const startDate = new Date(form.start);
  const endDate = new Date(form.end);
  const nightsNo = (endDate.getTime() - startDate.getTime())/1000/60/60/24;

  const navigate = useNavigate();

  return (
    <div>
      TripleRoomComponent is working
      <div>Number of nights: {nightsNo}</div>
      <div>Price: {result.price}</div>
      <button>Book now</button>
      <button onClick={() => navigate("/triple-room")} >Find more about this room.</button>
    </div>
  )
}

export default TripleRoomComponent
