import {useState, useEffect} from "react";
import {FaUser} from "react-icons/fa";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {register, reset as authReset} from "../features/auth/authSlice";
import {selectAuthSlice} from "../features/auth/authSlice";
import SpinnerComponent from "../components/SpinnerComponent";
// IBM carbon components
import {Button, TextInput} from "@carbon/react";
import {ButtonSkeleton, SkeletonText} from "@carbon/react";

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

    if(authIsLoading) {
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
                    <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
                    <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>

                    <div style={{margin: "20px"}}/>

                    <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
                    <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>

                    <div style={{margin: "20px"}}/>

                    <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
                    <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>

                    <div style={{margin: "20px"}}/>

                    <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
                    <SkeletonText width="80%" heading="true" style={{margin: "0 auto", textAlign: "left"}}/>
                    </div>
    
                    <ButtonSkeleton/>
                </form>
            </section>
            </>
        )
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
                    <TextInput type="text" id="name" name="name" labelText="Enter your name" value={name} onChange={onChange} required/>
                    <TextInput type="email" id="email" name="email" labelText="Enter your email" value={email} onChange={onChange} required/>
                    <TextInput type="password" id="password" name="password" labelText="Enter your password" value={password} onChange={onChange} required/>
                    <TextInput type="password" id="confirmPassword" name="confirmPassword" labelText="Confirm your password" value={confirmPassword} onChange={onChange} required/>
                </div>

                <Button kind = "secondary" type = "submit" disabled = {authIsSuccess == true ? true : false} >Register</Button>
            </form>
        </section>

        {(authIsSuccess && authMessage) ? <p style={{marginTop: "20px"}}>{authMessage.message}</p> : ""}
    </>
  )
}

export default RegisterPage;