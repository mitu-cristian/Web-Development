import {useEffect} from "react";

// import components
import Review from "../components/Review";
import Header from "../components/Header/Header";

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux for the review store
import {avgRating, getReviews} from "../features/review/reviewSlice";

function Home() {

  const {avg} = useSelector((state) => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(avgRating());
  })

  return (
    <>
      <Header bookingForm = {true}/>
      Avg rating: {avg}   
      <Review/>   
    </>
  )
}

export default Home
