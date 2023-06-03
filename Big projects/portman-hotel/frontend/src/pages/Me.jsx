import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom"; 

// import components
import ReviewItem from "../components/ReviewItem"

// Redux general
import {useSelector, useDispatch} from "react-redux";

// Redux for the auth store
import {deleteAcc, reset} from "../features/auth/authSlice";

// Redux for the user store
import {getMe, getMyReview, deleteMyReview, checkReview, addMyReview, updateMe, updatePass, resetMe} from "../features/user/userSlice";

function Me() {
  const {userMe, reviewMe, checkReviewMe, isLoadingMe, isErrorMe, isSuccessMe, isSuccessMeAddReview, messageMe} = useSelector((state) => state.userMe)
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

// For changing the info for the user
  useEffect(() => {
    if(messageMe && isErrorMe) 
      toast.error(messageMe);
    else if(messageMe && isSuccessMe)
      toast.success(messageMe);
    else if(isSuccessMeAddReview) {
      toast.success(messageMe);
      dispatch(getMyReview());
    }

      dispatch(resetMe())
  }, [messageMe, isErrorMe, isSuccessMe, dispatch]);


// Populating the form 
  useEffect(() => {
    if(userMe) {
      setFirstname(userMe.firstname);
      setLastname(userMe.lastname);
      setEmail(userMe.email);
    }
  }, [userMe])
  
// Update user information 
  const [updateUserInfo, setUpdateUserInfo] = useState(false)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const updateUserInfoClick = () => {
    dispatch(getMe());
    setUpdateUserInfo(!updateUserInfo);
  }

  const onSubmitInfo = (e) => {
    e.preventDefault();
    const userData = {firstname, lastname, email}
    dispatch(updateMe(userData))
    setUpdateUserInfo(!updateUserInfo)
  }

// Update user password  
  const [updateUserPass, setUpdateUserPass] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onSubmitPass = (e) => {
    e.preventDefault();

    const userData = {currentPassword, newPassword};
    dispatch(updatePass(userData));

// Reset the form
    setCurrentPassword("");
    setNewPassword("");

// Collapsing the form
    setUpdateUserPass(!updateUserPass);
  }


// Delete the account
  const deleteAccount = () => {
    dispatch(deleteAcc());
  }

  useEffect(() => {
    if(isError)
      toast.error(message)
    
    else if(isSuccess) {
      console.log("I am here.")
      toast.success(message)
      localStorage.removeItem("user");
      navigate("/")
    }

    dispatch(reset())
  },[isError, isSuccess, navigate, dispatch])

// Displaying the review
  useEffect(() => {
    dispatch(getMyReview())
    dispatch(checkReview())
  }, [])

//Delete the review
const buttonDeleteMyReview = () => {
  dispatch(deleteMyReview());
}

// Add the review
const [addReview, setAddReview] = useState(false)
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [rating, setRating] = useState("")

const onSubmitReview = (e) => {
  e.preventDefault();
  const userData = {title, description, rating};
  dispatch(addMyReview(userData));
  setAddReview(!addReview);
  setTitle("");
  setDescription("");
  setRating("");
}

// Displaying the loading component
  if(isLoadingMe)
    return <div>Loading...</div>

  return (
  <>

    {updateUserInfo &&
    <>
    <h1>Your user information are: </h1>
      <form onSubmit={onSubmitInfo}>
        <fieldset disabled = {!updateUserInfo}>
          <input type="text" id="firstname" name="firstname" value={firstname} placeholder="Enter your firstname." onChange={(e) => setFirstname(e.target.value)}  />
          <input type="text" id="lastname" name="lastname" value={lastname} placeholder="Enter your last name." onChange={(e) => setLastname(e.target.value)} />
          <input type="email" id="email" name="email" value={email} placeholder="Enter your email address." onChange={(e) => setEmail(e.target.value)} />
          {updateUserInfo && <button type="submit">Update</button>}
        </fieldset>
      </form>
      </>}

      <button onClick = {updateUserInfoClick}> {updateUserInfo ? "Cancel" : "Update user info"} </button>
    
    {updateUserPass &&
    <>
    <h2>Change the password</h2>
    <form onSubmit = {onSubmitPass}>
      <fieldset disabled = {!updateUserPass}>
          <input type="password" id="current-password" name="curret-password" value={currentPassword} placeholder="Enter your current password." onChange={(e) => setCurrentPassword(e.target.value)}/>
          <input type="password" id="new-password" name="new-password" value={newPassword} placeholder="Enter your new password." onChange={(e) => setNewPassword(e.target.value)}/>
          {updateUserPass && <button type="submit">Update</button>}
      </fieldset>
    </form>
    </>}

      <button onClick = {() => setUpdateUserPass(!updateUserPass)}> {updateUserPass ? "Cancel" : "Update password" } </button>
  
      <button onClick = {deleteAccount}>Delete my account</button>

      {reviewMe ? <><ReviewItem key = {reviewMe._id} review = {reviewMe} user={true}/> <button onClick = {buttonDeleteMyReview}>Delete my review</button></>: 
      <><div>You have no review.</div> <button disabled = {!checkReviewMe} id="addReviewButton" onClick = {() => setAddReview(!addReview)}> {addReview ? "Cancel" : "Add a review"}</button> </>
      }
      {addReview && 
      <>
        <form onSubmit = {onSubmitReview}>
      <fieldset>
        <input type="text" value={title} onChange = {(e) => setTitle(e.target.value)} />
        
        
        <ul className="rating">
          <li>
            <input type="radio" id="num1" value="1" onChange = {(e) => setRating(+e.target.value)} />
            <label htmlFor="num1">1</label>
          </li>
          <li>
            <input type="radio" id="num2" value="2" onChange = {(e) => setRating(+e.target.value)} />
            <label htmlFor="num2">2</label>
          </li>
          <li>
            <input type="radio" id="num3" value="3" onChange = {(e) => setRating(+e.target.value)} />
            <label htmlFor="num3">3</label>
          </li>
          <li>
            <input type="radio" id="num4" value="4" onChange = {(e) => setRating(+e.target.value)} />
            <label htmlFor="num4">4</label>
          </li>
          <li>
            <input type="radio" id="num5" value="5" onChange = {(e) => setRating(+e.target.value)} />
            <label htmlFor="num5">5</label>
          </li>
        </ul>
        
        <input type="text" value={description} onChange = {(e) => setDescription(e.target.value)} />
      </fieldset>
    <button>Submit review</button>
    </form> 
    </>  
      }
  </>
  )
}

export default Me
