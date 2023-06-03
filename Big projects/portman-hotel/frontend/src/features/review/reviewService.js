import axios from "axios";

const API_URL = "/api/reviews/";

// Get average rating
const avgRating = async () => {
    const response = await axios.get(API_URL + "average");
    if(response.data.success === true) 
        return response.data.ratingAvg;
    else return response.data;
}

// See all reviews
const getReviews = async () => {
    const response = await axios.get(API_URL + "all");
    if(response.data.success === true)
        return response.data.data;
    else return response.data;
}

// Update the review
const updateReview = async (userData) => {
    const response = await axios.put(API_URL, userData, {withCredentials: true});
    if(response.data.success === true)
        return response.data.data;
    else return response.data;
}

const reviewService = {
    avgRating, getReviews, updateReview
};

export default reviewService;