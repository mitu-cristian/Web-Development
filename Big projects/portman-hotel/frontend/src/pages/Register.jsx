import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Redux
import {toast} from "react-toastify"
import {useSelector, useDispatch} from "react-redux";
import {register, reset} from "../features/auth/authSlice";

function Register() {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password2: ""
    })

    const {firstname, lastname, email, password, password2} = formData;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError)
            toast.error(message);

        if(isSuccess || user) {
            navigate("/");
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch] )
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(password !== password2)
            toast.error("Passwords do no match.")
        else {
            const userData = {firstname, lastname, email, password};
            dispatch(register(userData));

            if(isSuccess === true)
                toast.success("You have successfully registered your account.")
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
            
            <div>
                <input type="text" id="firstname" name="firstname" value={firstname}
                placeholder="Enter your firstname" onChange={onChange}/>
            </div>

            <div>
                <input type="text" id="lastname" name="lastname" value={lastname}
                placeholder="Enter your lastname" onChange={onChange} />
            </div>

            <div>
                <input type="email" id="email" name="email" value={email}
                placeholder="Enter your email address" onChange={onChange}/>
            </div>

            <div>
                <input type="password" id="password" name="password" value={password}
                placeholder="Enter your password" onChange={onChange} />
            </div>

            <div>
                <input type="password" id="password2" name="password2" value={password2}
                placeholder="Confirm your password" onChange={onChange} />
            </div>

            <div>
                <button type="submit">Submit</button>
            </div>

        </form>
      </section>
    </>
  )
}

export default Register
