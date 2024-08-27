import {useState, useEffect} from "react";
import {FaSignInAlt} from "react-icons/fa";
import {toast} from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {login, reset} from "../features/auth/authSlice";
import {selectAuthSlice} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import SpinnerComponent from "../components/SpinnerComponent";
// IBM Carbon Components
import {Button, TextInput} from "@carbon/react";
import {ButtonSkeleton, SkeletonText} from "@carbon/react";

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
        if(user && isSuccess) {
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
        return (
            <>
            <section className="heading">
                <h1>
                    <FaSignInAlt/> Login
                </h1>
                <p>Please login to your account</p>
            </section>
    
            <section className="form">
                <form> 
                    <div className="form-group">
                        <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
                        <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>

                        <div style={{margin: "20px"}}/>

                        <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
                        <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
                    </div>
                        <ButtonSkeleton style={{margin: "20px"}}/>
                </form>
            </section>
            
            </>
        )
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
                    <TextInput type="email" id="email" name="email" labelText="Enter your email" value = {email} onChange = {onChange} required/>
                    <TextInput type="password" id="password" name="password" labelText="Enter your password" value={password} onChange={onChange} required/>
                </div>
                    <Button kind="secondary" type="submit">Log in</Button>
            </form>
        </section>
        
        </>
  )
}

export default LoginPage;