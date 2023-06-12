import "./home.css";
import hotel_image from "./images/hotel-image.jpg";

import {useEffect} from "react";

// import components
import Review from "../../components/Review";
import Header from "../../components/Header/Header";
import BookingFormHome from "../../components/BookingFormHome/BookingFormHome";

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux for the review store
import {avgRating, getReviews} from "../../features/review/reviewSlice";

function Home() {

  const {avg} = useSelector((state) => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(avgRating());
  })

  return (
    <>
      <Header bookingForm = {false}/>
      <main>
        <div className="container">
          <img className="hotel-image" src={hotel_image} alt="" />

          <div className="booking-form">
            <BookingFormHome/>
          </div>
          
        </div>
      </main>
      Avg rating: {avg}   
      {/* <Review/>    */}
    </>
  )
}

export default Home
