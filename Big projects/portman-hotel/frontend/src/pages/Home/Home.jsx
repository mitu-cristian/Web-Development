// import CSS
import "./home.css";
import "./facilities.css";
import "./tourist_spots.css";

// import images
import hotel_image from "./images/hotel-image.jpg";
import facilities from "./images/facilities.png";
import breakfast from "./images/breakfast.jpg";
import conference from "./images/conference.jpg";
import parking from "./images/parking.jpg";
import tourist_spots from "./images/tourist-spots.png";

import {useEffect, useState} from "react";

// import components
import Review from "../../components/Review";
import Header from "../../components/Header/Header";
import BookingForm from "../../components/BookingForm/BookingForm";

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux for the review store
import {avgRating, getReviews, reset} from "../../features/review/reviewSlice";

function Home() {

  const {avg, reviews, isSuccessReviewPagination} = useSelector((state) => state.review);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState("");

  useEffect(() => {
    dispatch(avgRating());
  }, [])

  useEffect(() => {
    if(isSuccessReviewPagination) 
      setPagination(reviews.pagination)
    dispatch(reset())
  }, [isSuccessReviewPagination, dispatch])

  const [selectedValue, setSelectedValue] = useState(JSON.parse(localStorage.getItem("rating")))

  const handleSelectChange = (event) => {
    console.log(event.target.value)
    const userData = {
      "rating": event.target.value,
      "page": 1
    }
    localStorage.setItem("rating", JSON.stringify(event.target.value))
    setSelectedValue(event.target.value)
    dispatch(getReviews(userData))
  }

// =================  Functionality for the "Next page" button
  const nextPageFunction = () => {
    if(reviews.pagination.next?.page)
    dispatch(getReviews({"rating": JSON.parse(localStorage.getItem("rating")), "page": reviews.pagination.next.page}))
  }

  const disableNextPageButton = () => {
    if(!pagination.next?.page || reviews.count === 0)
      return true;
    else 
      return false;
  }

// ======================== Functionality for the "Previous page" button
  const prevPageFunction = () => {
    if(reviews.pagination.prev?.page)
      dispatch(getReviews({"rating": JSON.parse(localStorage.getItem("rating")), "page": reviews.pagination.prev.page}))
  }

  const disablePrevPageButton = () => {
    if(!pagination.prev?.page)
      return true;
    else  
      return false;
  }

  return (
    <>
      <Header/>
      <main>
        <div className="container">
          <div className="hotel-image-container">
            <img className="hotel-image" src={hotel_image} alt="" />
          </div>
          
          <div >
            <BookingForm/>
          </div>
          
          <div className="facilities">
            <div className="facilities-introduction">
              <img id="facilty-image" src={facilities} alt=""/>
              <h1>Facilități</h1>
            </div>

            <div className="boxes-facilities">

              <div className="box-facility">
                <img src={parking} alt="" />
                <h2>Parcare</h2>
                <p>Hotelul oferă parcare gratuită, permițând oaspeților să își parcheze convenabil vehiculele fără a suporta taxe suplimentare.</p>
              </div>

              <div className="box-facility">
                <img src={breakfast} alt="" />
                <h2>Mic dejun</h2>
                <p>Mic dejun gratuit tuturor oaspeților ca parte a sejurului.</p>
              </div>

              <div className="box-facility">
                <img src={conference} alt="" />
                <h2>Sală de conferințe</h2>
                <p>Hotelul are la dispoziție spații concepute special pentru întâlniri de afaceri, seminarii și alte evenimente profesionale.</p>
              </div>

            </div>
          </div>

          <div className="tourist-spots">

            <div className="tourist-spots-introduction">
              <img src={tourist_spots} alt="" />
              <h1>Obiective turistice</h1>
            </div>

            <div className="boxes-tourist-spots">
              
              <div className="card" id="card1">
                <div className="card-content">
                  <h2 className="card-title">Faleza din Galați</h2>
                  <p className="card-body">Amenajată la jumătatea secolului al XX-lea în scop turistic și pentru a ameliora circulația motorizată, Faleza Dunării reprezintă unul dintre cele mai importante obiective turistice din Galați.</p>
                </div>
              </div>

              <div className="card" id="card2">
                <div className="card-content">
                  <h2 className="card-title">Grădina Publică</h2>
                  <p className="card-body">Grădina Publică are o suprafață de aprox. 100.000 mp, fiind o zonă de agrement, unde se organizează evenimentele orașului.</p>
                </div>
              </div>

              <div className="card" id="card3">
                <div className="card-content">
                  <h2 className="card-title">Grădina Botanică</h2>
                  <p className="card-body"> Patrimoniul Grădinii Botanice este format din peste 260.000 de exemplare de arbori, arbuști și flori, care se întinde pe o suprafață de aprox. 18 hectare.</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Avg rating: {avg}    */}
        
        
        <div className="container">
          <div className="user-reviews">

            <div className="facilities-introduction">
              <img id="facilty-image" src={facilities} alt=""/>
              <h1>Rating {avg}/5</h1>
            </div>
            
            <label>Filtrează: </label>
            <select name="cars" id="cars" onChange={handleSelectChange} value={selectedValue}>
              <option value="all">Toate recenziile</option>
              <option value="5">Recenzii cu 5 stele</option>
              <option value="4">Recenzii cu 4 stele</option>
              <option value="3">Recenzii cu 3 stele</option>
              <option value="2">Recenzii cu 2 stele</option>
              <option value="1">Recenzii cu o stea</option>
            </select>

            <Review/>  
            
            <button 
              onClick = {prevPageFunction} disabled = {disablePrevPageButton() === true ? true : false}
              >Previous page</button>
            <button 
              onClick = {nextPageFunction} disabled = {disableNextPageButton() === true ? true : false}
              >
                Next page</button>
          </div>
        </div>
            

      </main>
      
    </>
  )
}

export default Home
