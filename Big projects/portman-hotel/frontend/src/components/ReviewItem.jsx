import {useState, useEffect} from "react";
import {toast} from "react-toastify"; 

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux for the user store
import {updateReview, reset} from "../features/review/reviewSlice";

function ReviewItem({review, user}) {
  
// Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    return formattedDate;
  }
  const createdAt = formatDate(review.createdAt);
  let updatedAt = formatDate(review.updatedAt);
  
// Updating the review
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.review)

  const dispatch = useDispatch();

  useEffect(() => {
    if(isError)
      toast.error(message);
    else if(isSuccess) {
// Change existing review
      const divTitle = document.getElementById("title");
      divTitle.textContent = title;
      const divRating = document.getElementById("rating");
      divRating.textContent = rating;
      const divDescription = document.getElementById("description");
      divDescription.textContent = description;
      updatedAt = formatDate(new Date())
      toast.success("Your review has been updated.");
    }
    dispatch(reset())
  }, [isError, isSuccess, message, reset])

  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  const editReview = () => {
    setEdit(!edit);
    setTitle(review.title);
    setDescription(review.description);
    setRating(review.rating);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {title, description, rating};
    dispatch(updateReview(userData))
    setEdit(!edit);
    }

  return (
    <>
    {user && <button onClick = {editReview}> {edit ? "Cancel" : "Edit" } </button>}

    {edit &&
    <>
    <form onSubmit = {onSubmit}>
      <fieldset>
        <input type="text" value={title} onChange = {(e) => setTitle(e.target.value)} />
        
        <ul className="rating">
          <li>
            <input type="radio" id="num1" value="1" checked={rating === 1} onChange = {(e) => setRating(+e.target.value)} />
            <label htmlFor="num1">1</label>
          </li>
          <li>
            <input type="radio" id="num2" value="2" checked = {rating === 2} onChange = {(e) => setRating(+e.target.value)} />
            <label htmlFor="num2">2</label>
          </li>
          <li>
            <input type="radio" id="num3" value="3" checked = {rating === 3} onChange = {(e) => setRating(+e.target.value)} />
            <label htmlFor="num3">3</label>
          </li>
          <li>
            <input type="radio" id="num4" value="4" checked = {rating === 4} onChange = {(e) => setRating(+e.target.value)} />
            <label htmlFor="num4">4</label>
          </li>
          <li>
            <input type="radio" id="num5" value="5" checked = {rating === 5} onChange = {(e) => setRating(+e.target.value)} />
            <label htmlFor="num5">5</label>
          </li>
        </ul>
        
        <input type="text" value={description} onChange = {(e) => setDescription(e.target.value)} />
      </fieldset>
    <button>Update</button>
    </form> 
    </>
    }
    

    <section>
      <div id="title">title: {review.title}</div>
      <div id="description">description: {review.description}</div>
      <div id="rating">rating: {review.rating}</div>
      {!user && <div>user: {review.user.firstname} {review.user.lastname}</div>}
      <div>created at: {createdAt}</div>
      {createdAt !== updatedAt && <div>updated at: {updatedAt}</div>}
      
    </section>

    <br></br>
    </>
  )
  }

export default ReviewItem
