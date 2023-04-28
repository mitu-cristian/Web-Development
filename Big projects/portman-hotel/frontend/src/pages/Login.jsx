import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Redux
import {useSelector, useDispatch} from "react-redux";
import {login, reset} from "../features/auth/authSlice";
import {toast} from "react-toastify";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formData;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    
    useEffect(() => {
      if(isError)
        toast.error(message);
      
      if(isSuccess || user)
        navigate("/");

      dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onSubmit = (e) => {
      e.preventDefault();
      const userData = {email, password}
      dispatch(login(userData));
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
            <input type="email" id="email" name="email" value={email}
            placeholder="Enter your email address" onChange={onChange} />
        </div>
        <div>
            <input type="password" id="password" name="password" value={password}
            placeholder="Enter your password" onChange={onChange}/>
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>

        </form>
      </section>
    </>
  )
}

export default Login
