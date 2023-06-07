import "./reserve.css";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";

// React general
import {useState, useEffect} from "react";

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux from booking store
import {resetFo, getSingleRoom, addReservation} from "../../features/booking/bookingSlice";

function Reserve({setOpen, roomId}) {
    
    const {form, rooms, isLoadingFo, isSuccessFo, messageFo} = useSelector((state) => state.booking)
    const dispatch = useDispatch();

    const [selectedRooms, setSelectedRooms] = useState([])

    useEffect(() => {
        if(isSuccessFo && messageFo)
            toast.success(messageFo)
    }, [dispatch, isSuccessFo, messageFo])

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime())
        let list = [];

        while(date <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return list;
    }

    const allDates = getDatesInRange(form.start, form.end)
    
    const isAvailable = (roomNumber) => {
        const unavailableDatesModified = []
        for(let i = 0; i < roomNumber.unavailableDates.length; i = i + 1)
        unavailableDatesModified.push(new Date(roomNumber.unavailableDates[i]).getTime() - 3*60*60*1000)

        console.log("allDatesLength", allDates.length)
        console.log("unavailableMofidiedLength", unavailableDatesModified.length)

        let available = true;
        let k = 0;
        while (k < allDates.length && available === true) {
            let j = 0;
            while (j < unavailableDatesModified.length && available === true) {
                console.log(`allDates k = ${k}`, allDates[k])
                console.log(`unavailableDates j = ${j}`, unavailableDatesModified[j])
                if(allDates[k] === unavailableDatesModified[j]) {
                    available = false
                    console.log("available din interiorul if-ului", available)
                }
                console.log("Rezultatul este: ", available)
                console.log("")
                j = j + 1;
            }
            k = k + 1;
        }
        return available;  
    }


    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value)) 
    }

    const handleClick = async () => {
            await Promise.all(selectedRooms.map((roomId) => {
               const userData = {
                    roomId, form
                }
                dispatch(addReservation(userData))
            }))
        
    }

    if(isLoadingFo)
        return <div>Loading...</div>

  return (
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)}/>
            <span>Select your rooms:</span>
        </div>
        {rooms.roomNumbers.map(roomNumber => (
            <div className="room" key={roomNumber._id}>
                <label> {roomNumber.number} </label>
                <input type="checkbox" value={roomNumber._id} onChange={handleSelect} 
                disabled={!isAvailable(roomNumber)}
                />
            </div>
        ))}
        <button onClick={handleClick}>Reserve now!</button>
    </div>
  )
}

export default Reserve
