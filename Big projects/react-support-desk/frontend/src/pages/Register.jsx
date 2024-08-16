import {useState, useEffect} from 'react';
import {FaUser} from 'react-icons/fa';
import {toast} from 'react-toastify';
// useSelector to select from the global state
import {useSelector, useDispatch} from 'react-redux';
import {register, reset} from '../features/auth/authSlice';
import {useNavigate} from 'react-router-dom';
import Spinner from '../components/Spinner';

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)
    
    useEffect(() => {
        if(isError)
            toast(message) 

// Redirect when logged in
        if(isSuccess ||  user) 
            navigate('/');

        dispatch(reset())
    },[isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== password2) 
            toast('Passwords do not match')
        else {
            const userData = { name, email, password};
            dispatch(register(userData))
        }
    }

    if(isLoading)
        return <Spinner/>

    return (
      <>
        <section className="heading">
            <h1>
                <FaUser/> Register 
            </h1>
            <p>Please create an account.</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id='name' value={name}
                        name='name' required onChange={onChange} placeholder='Enter your name'/>
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" id='email' value={email}
                        name='email' required onChange={onChange} placeholder='Enter your email'/>
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" id='password' value={password}
                        name='password' required onChange={onChange} placeholder='Enter your password'/>
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" id='password2' value={password2}
                        name='password2' required onChange={onChange} placeholder='Confirm your password'/>
                </div>

                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
      </>
    )
  }
  
export default Register
  