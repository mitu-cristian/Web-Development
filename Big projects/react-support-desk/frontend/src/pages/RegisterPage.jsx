import {useState, useEffect} from "react";
import {FaUser} from "react-icons/fa";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {register, reset as authReset} from "../features/auth/authSlice";
import {selectAuthSlice} from "../features/auth/authSlice";
import SpinnerComponent from "../components/SpinnerComponent";

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        cofirmPassword: ""
    })

    const {name, email, password, confirmPassword} = formData;

    const dispatch = useDispatch();
    const {isLoading: authIsLoading, isError: authIsError, isSuccess: authIsSuccess, message: authMessage} = useSelector(selectAuthSlice);

    useEffect(() => {
        if(authIsError) {
            toast.error(authMessage);
        }
        if(authIsSuccess) {
            return () => {
                dispatch(authReset());
            }
        }
    }, [authIsError, authIsSuccess, authMessage, dispatch]);

    const onChange = (event) => {
        setFormData((prevState) => ({
            ...prevState, 
            [event.target.name]: event.target.value
        }))
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Passwords do not match");
        }
        else {
            const userData = {name, email, password};
            dispatch(register(userData));
        }
        
    }

    console.log(authMessage);

    if(authIsLoading) {
        return <SpinnerComponent/>
    }

  return (
    <>
        <section className="heading">
            <h1>
                <FaUser/> Register
            </h1>
            <p>Please create an account</p>
        </section>

        <section className="form">
            <form onSubmit = {onSubmit}> 
                <div className="form-group">
                    <input type="text" className="form-control" name = "name" id="name" value = {name} onChange = {onChange} placeholder="Enter your name" required/>
                    <input type="email" className="form-control" name = "email" id="email" value = {email} onChange = {onChange} placeholder="Enter your email" required/>
                    <input type="password" className="form-control" name = "password" id="password" value = {password} onChange = {onChange} placeholder="Enter your password" required />
                    <input type="password" className="form-control" name = "confirmPassword" id="confirmPassword" value = {confirmPassword} onChange = {onChange} placeholder="Confirm your password" required />
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>

        {(authIsSuccess && authMessage) ? <p>{authMessage.message}</p> : ""}
    </>
  )
}

export default RegisterPage;