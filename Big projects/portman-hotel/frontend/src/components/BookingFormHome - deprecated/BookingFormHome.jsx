import "./bookingFormHome.css"
// Calendar
import {DateRange} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {format} from "date-fns";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays, faChildren, faPerson} from "@fortawesome/free-solid-svg-icons"; 

// React general
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Redux
import {useSelector, useDispatch} from "react-redux";

// Redux from booking store
import {resetFo, resetFoResult, checkUserCriteria} from "../../features/booking/bookingSlice";

function BookingFormHome() {

// For the calendar
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

// For the adults
    const [openAdultsOptions, setOpenAdultsOptions] = useState(false)
    const [adultsOptions, setAdultsOptions] = useState(1)

// For the children
    const [openChildrenOptions, setOpenChildrenOptions] = useState(false)
    const [childrenOptions, setChildrenOptions] = useState(0)

const handleOptions = (name, operation) => {
    if(name == "adult" && operation == "d") {
        if(adultsOptions > 1)
            setAdultsOptions(adultsOptions-1);
    }
    else if(name == "adult" && operation == "i")
        setAdultsOptions(adultsOptions+1);
    else if(name == "child" && operation == "d") {
            setChildrenOptions(childrenOptions-1);
    }
    else if(name == "child" && operation == "i")
        setChildrenOptions(childrenOptions+1);
}

// Hook the form

const navigate = useNavigate();
const dispatch = useDispatch();

const {form, isLoadingFo, isSuccessFo} = useSelector((state) => state.booking)


useEffect(() => {
    if (form != null) {
        setAdultsOptions(form.adults);
        setChildrenOptions(form.children);
        setDate((prevDate) => [{
            ...prevDate[0],
            startDate: new Date(form.start),
            endDate: new Date(form.end)
        }])
    }
}, [])


useEffect(() => {
    if(isSuccessFo) {
        navigate("/booking")
        localStorage.setItem("adults", JSON.stringify(adultsOptions));
        localStorage.setItem("children", JSON.stringify(childrenOptions));
        localStorage.setItem("startDate", JSON.stringify(date[0].startDate));
        localStorage.setItem("endDate", JSON.stringify(date[0].endDate));
    }
    dispatch(resetFo())
},[isSuccessFo, resetFo])

const bookingFunction = (e) => {
    e.preventDefault();
    const userData = {
        "adults": adultsOptions, 
        "children": childrenOptions, 
        "start": date[0].startDate.toLocaleString('en-US'), 
        "end": date[0].endDate.toLocaleString('en-US')
    }
    dispatch(checkUserCriteria(userData))
}

const resetForm = (e) => {
    e.preventDefault();
    dispatch(resetFoResult())
    setAdultsOptions(1);
    setChildrenOptions(0);
    setDate((prevDate) => [{
        ...prevDate[0],
        startDate: new Date(),
        endDate: new Date()
    }])
    localStorage.removeItem("adults");
    localStorage.removeItem("children");
    localStorage.removeItem("startDate");
    localStorage.removeItem("endDate");
}

  return (
    <div className="headerSearch">
        <div className="headerSearchItem">
            <FontAwesomeIcon icon = {faCalendarDays} className="headerIcon" />
            <span onClick = {() => setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "dd.MM.yyyy")}`} to {`${format(date[0].endDate, "dd.MM.yyyy")}`}</span>
            {openDate && <DateRange editableDateInputs={true} onChange = {item => setDate([item.selection])} 
            moveRangeOnFirstSelection = {false} ranges = {date} className="date"/>}
        </div>

        <div className="headerSearchItem">
            <FontAwesomeIcon icon = {faPerson} className="headerIcon"/>
            <span className="headerSearchText" onClick = {() => setOpenAdultsOptions(!openAdultsOptions)}>{adultsOptions} {adultsOptions == 1 ? "adult" : "adults"} </span>
            {openAdultsOptions && <div className="options">
                <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                        <button className="optionCounterButton" disabled={adultsOptions == 1} onClick = {() => handleOptions("adult", "d")}>-</button>
                        <span className="optionCounterNumber"> {adultsOptions} </span>
                        <button className="optionCounterButton" onClick = {() => handleOptions("adult", "i")}>+</button>
                    </div>
                </div>
            </div>}
        </div>

        <div className="headerSearchItem">
            <FontAwesomeIcon icon = {faChildren} className="headerIcon"/>
            <span className="headerSearchText" onClick = {() => setOpenChildrenOptions(!openChildrenOptions)}> {childrenOptions > 0 && childrenOptions} {childrenOptions == 1 ? "child" : ((childrenOptions == 0 ? "No child" : "children"))}</span>
            {openChildrenOptions && <div className="options">
                <div className="optionItem">
                    <span className="optionText">Child</span>
                    <div className="optionCounter">
                        <button className="optionCounterButton" disabled = {childrenOptions == 0} onClick = {() => handleOptions("child", "d")}>-</button>
                        <span className="optionCounterNumber"> {childrenOptions} </span>
                        <button className="optionCounterButton" onClick = {() => handleOptions("child", "i")}>+</button>
                    </div>
                </div>
            </div>}
        </div>

        <div className="headerSearchItem">
            <button className="headerBtn" onClick = {bookingFunction}>Search</button>
        </div>

        <div className="headerSearchItem">
            <button className="headerBtn" onClick = {resetForm}>Reset</button>
        </div>
    </div>
  )
}

export default BookingFormHome
