import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectAuthSlice} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createTicket, reset} from "../features/tickets/ticketSlice";
import {selectTicketSlice} from "../features/tickets/ticketSlice";
import SpinnerComponent from "../components/SpinnerComponent";
import BackButtonComponent from "../components/BackButtonComponent";
// IBM carbon components
import {Button, TextInput, TextArea, Select, SelectItem} from "@carbon/react";

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
          {/* <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={user.name} disabled /> */}
          <TextInput type="text" value={user.name} labelText="Customer name" readOnly/>
        </div>

        <div className="form-group">
          {/* <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value = {user.email} disabled /> */}
          <TextInput type="text" value={user.email} labelText="Customer email" readOnly/>
        </div>

        <form onSubmit = {onSubmit}>
          <div className="form-group">
            {/* <label htmlFor="product">Product</label>
            <select name="name" id="product" value={product} onChange = {(event) => setProduct(event.target.value)}>
              <option value="Windows 11">Windows 11</option>
              <option value="Office 365">Office 365</option>
              <option value="One Drive">One Drive</option>
              <option value="Xbox">Xbox</option>
            </select> */}
            <Select id="product" labelText="Select a product" value={product} onChange={(event) => setProduct(event.target.value)}>
              <SelectItem value="Windows 11" text="Windows 11"/>
              <SelectItem value="Office 365" text="Office 365"/>
              <SelectItem value="One Drive" text="One Drive"/>
              <SelectItem value="Xbox" text="Xbox"/>
            </Select>
          </div>

          <div className="form-group">
            {/* <label htmlFor="description">Description of the issue</label>
            <textarea name="description" id="description" className="form-control" placeholder="Description"
            value={description} onChange={(event) => setDescription(event.target.value)}></textarea> */}
            <TextArea labelText="Description of the issue" value={description} onChange={(event) => setDescription(event.target.value)}/>
          </div>

          <div className="form-group">
            {/* <button className="btn btn-block">Submit</button> */}
            <Button type="submit" kind="secondary">Submit</Button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicketPage;