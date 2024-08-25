import {useState, useEffect} from "react";
import {FaSignInAlt} from "react-icons/fa";
import {toast} from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {login, reset} from "../features/auth/authSlice";
import {selectAuthSlice} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import SpinnerComponent from "../components/SpinnerComponent";
// IBM Carbon Components
import {Button} from "@carbon/react";

const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formData;

    const onChange = (event) => {
        setFormData((prevState) => ({
            ...prevState, 
            [event.target.name]: event.target.value
        }))
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isLoading, isSuccess, isError, message} = useSelector(selectAuthSlice);

    useEffect(() => {
        if(user || isSuccess) {
            navigate("/");
        }
        else if (isError) {
            toast.error(message);
        }
        dispatch(reset());
    }, [user, isSuccess, isError, dispatch]);

    const onSubmit = (event) => {
        event.preventDefault();
        const userData = {email, password};
        dispatch(login(userData));
    }

    if(isLoading) {
        return <SpinnerComponent/>
    }

  return (
        <>
        <section className="heading">
            <h1>
                <FaSignInAlt/> Login
            </h1>
            <p>Please login to your account</p>
        </section>

        <section className="form">
            <form onSubmit = {onSubmit}> 
                <div className="form-group">
                    <input type="email" className="form-control" name = "email" id="email" value = {email} onChange = {onChange} placeholder="Enter your email" required/>
                    <input type="password" className="form-control" name = "password" id="password" value = {password} onChange = {onChange} placeholder="Enter your password" required />
                </div>
                <div className="form-group">
                    {/* <button className="btn btn-block">Submit</button> */}
                    <Button size = "xl" className="button">Log in</Button>
                </div>
            </form>
        </section>
        
        </>
  )
}

export default LoginPage;