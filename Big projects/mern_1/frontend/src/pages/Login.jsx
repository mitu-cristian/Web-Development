import {useState, useEffect} from 'react';
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
  const [formData, SetFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

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
  }
  return (
    <>
      <section className='heading'>
        <h1><FaSignInAlt/> Login</h1>
        <p>Login into your account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>

          <div className="form-group">
          <input type="email" className='form-control' id='email' 
          name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
          </div>

          <div className="form-group">
          <input type="password" className='form-control' id='password' 
          name='password' value={password} placeholder='Enter your password' onChange={onChange}/>
          </div>

          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
