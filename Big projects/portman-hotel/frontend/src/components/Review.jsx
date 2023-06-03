// import components
import ReviewItem from "./ReviewItem";

import {useEffect} from "react";

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux for the review store
import {avgRating, getReviews, reset} from "../features/review/reviewSlice";

function Review() {

    const{avg, reviews, isError, isLoading, isSuccess, message} = useSelector((state) => state.review);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(avgRating());
        dispatch(getReviews())
    }, [])

    if(!reviews)
        return <div>Loading...</div>

  return (
    <>
      Avg rating: {avg}
      {reviews.map((review) => (<ReviewItem key={review._id} review = {review} user={false}/>))}
    </>
  )
}

export default Review
