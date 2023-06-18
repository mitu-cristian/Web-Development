import "./reviewItem.css"

import {useState, useEffect} from "react";
import {toast} from "react-toastify"; 

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux for the user store
import {updateReview, reset} from "../../features/review/reviewSlice";

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
    

  // Disable submit button functionality

  const input_review_title = document.getElementById("review-title");
  const input_review_description = document.getElementById("review-description");

  function checkValidity_update_user_review() {
    if (input_review_title && input_review_description) {
      if(input_review_title.checkValidity() && input_review_description.checkValidity() && title.length !== 0 &&
      description.length !== 0) { return true; }
    }
    else return false;
  }




  return (
    <>
    {user && <button className="button-86 me-page" onClick = {editReview}> {edit ? "Anulează" : "Editează recenzia" } </button>}

    {edit &&
    <>
    <form onSubmit = {onSubmit}>
      <fieldset>

      <div className="formInput-me">
      <div className="input-me">
        <section className="input-content-me">
          <div className="input-content-wrap-me">
            <dl className="inputbox-me">
              <dd className="inputbox-content-me">
              <input type="text" id="review-title" value={title} onChange = {(e) => setTitle(e.target.value)} required />
                <div className="underline-me"></div>
                <label >Titlu</label></dd></dl></div></section></div></div>

        {/* <input type="text" value={title} onChange = {(e) => setTitle(e.target.value)} /> */}
        <div id="radio-button-text">Nota</div>
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
        
        {/* <input type="text" id="review-description" value={description} onChange = {(e) => setDescription(e.target.value)} required /> */}
        <textarea name="description" id="review-description" value={description} cols="30" rows="10" onChange = {(e) => setDescription(e.target.value)}>
          
        </textarea>
      </fieldset>
    <button disabled = {checkValidity_update_user_review() === true ? false : true} className="button-86 me-page">Actualizează</button>
    
    </form> 
    </>
    }
    

    <section className="my-review">
      <div id="title-review">Titlu: <span>{review.title}</span></div>
      <div id="description-review">Descriere: <span>{review.description}</span> </div>
      <div id="rating-review">Nota: <span>{review.rating}</span></div>
      {!user && <div id="user-review">Dl./Dna.: <span>{review.user.firstname} {review.user.lastname}</span></div>}
      <div id="created-at">Postat: <span>{createdAt}</span>  </div>
      {createdAt !== updatedAt && <div id="updated-at">Actualizat: <span>{updatedAt}</span> </div>}
      
    </section>

    <br></br>
    </>
  )
  }

export default ReviewItem
