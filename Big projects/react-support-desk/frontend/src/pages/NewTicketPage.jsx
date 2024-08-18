import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectAuthSlice} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createTicket, reset} from "../features/tickets/ticketSlice";
import {selectTicketSlice} from "../features/tickets/ticketSlice";
import SpinnerComponent from "../components/SpinnerComponent";
import BackButtonComponent from "../components/BackButtonComponent";

const NewTicketPage = () => {

  const {user} = useSelector(selectAuthSlice);
  const {isLoading, isError, isSuccess, message} = useSelector(selectTicketSlice);
  const [product, setProduct] = useState("Windows 11");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(isError) 
      toast.error(message);
    if(isSuccess) {
      dispatch(reset());
      navigate("/my-tickets");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate]);

  const onSubmit = (event) => {
    event.preventDefault();
    if(description.trim() === "")
      toast.error("Please add a description.")
    else
      dispatch(createTicket({product, description}));
  }

  if(isLoading)
    return <SpinnerComponent/>

  return (
    <>
      <BackButtonComponent url = "/"/>
      <section className="heading">
        <h1>Create new ticket</h1>
        <p>Please fill the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={user.name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value = {user.email} disabled />
        </div>

        <form onSubmit = {onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select name="name" id="product" value={product} onChange = {(event) => setProduct(event.target.value)}>
              <option value="Windows 11">Windows 11</option>
              <option value="Office 365">Office 365</option>
              <option value="One Drive">One Drive</option>
              <option value="Xbox">Xbox</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea name="description" id="description" className="form-control" placeholder="Description"
            value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicketPage;