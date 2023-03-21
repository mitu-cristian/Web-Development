import {useState, useEffect} from 'react';
import {FaUser} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
// useSelector bring something from the state (user.loading)
// dispatch a function like register, we use useDispatch
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {register, reset} from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, SetFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth) 

  useEffect(() => {
    if(isError)
      toast.error(message)
    if(isSuccess || user)
      navigate('/')
    
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    SetFormData((prevState) => ({
      ...prevState,
// This is possible because we have a name for every input
// e.target.value represents the value that has been typed
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2)
      toast.error('Password do no match.')
    else {
// This comes from the form
      const userData = {name, email, password}
      dispatch(register(userData))
    }
  }

  if(isLoading)
    return <Spinner/>

  return (
    <>
      <section className='heading'>
        <h1><FaUser/> Register</h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
          <input type="text" className='form-control' id='name' 
          name='name' value={name} placeholder='Enter your name' onChange={onChange}/>
          </div>

          <div className="form-group">
          <input type="email" className='form-control' id='email' 
          name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
          </div>

          <div className="form-group">
          <input type="password" className='form-control' id='password' 
          name='password' value={password} placeholder='Enter your password' onChange={onChange}/>
          </div>

          <div className="form-group">
          <input type="password" className='form-control' id='password2' 
          name='password2' value={password2} placeholder='Enter again your password' onChange={onChange}/>
          </div>

          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
