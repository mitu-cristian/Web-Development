import "./App.css";
import FormInput from "./components/FormInput";

import {useState, useEffect} from "react";

function App() {
 
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [validData, setValidData] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    confirmPassword: false
  })

  function addBackslash(str) {
    return str.replace(/[$^*.?"{}|]/g, "\\$&");
  }

  const inputs = [
    {
      id: 1,
      name: "firstname",
      type: "text",
      placeholder: "Firstname",
      label: "Firstname",
      errorMessage: "Add a valid firstname",
      pattern: "^^[A-Za-z ]+$",
      required: true
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "Lastname",
      label: "Lastname",
      errorMessage: "Add a valid lastname",
      pattern: "^[A-Za-z ]+$",
      required: true
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "It should be a valid email address.",
      required: true
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      errorMessage: "Password should be 8 characters at minimum.",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?\":{}|<>`~;/\[\]])",
      required: true
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
      label: "Confirm password",
      errorMessage: "Passwords do not match.",
      pattern: addBackslash(values.password),
      required: true
    }

  ]
//$ ^ * . ? " { } |
const input1 = document.getElementById("1");
const input2 = document.getElementById("2");
const input3 = document.getElementById("3");
const input4 = document.getElementById("4");
const input5 = document.getElementById("5");

function checkValidity() {
  if(input1 && input2 && input3 && input4 && input5) {
    if(input1.checkValidity() && input2.checkValidity() && input3.checkValidity && input4.checkValidity() && input5.checkValidity() &&
    values.password === values.confirmPassword)
      return true;
  } 
  else 
    return false;
}
// `~:;'/"

  const lowerCase = /[a-z]/.test(values.password);
  const upperCase = /[A-Z]/.test(values.password);
  const number = /\d/.test(values.password);
  const specialCharacter = /[!@#$%^&*(),.?\":{}|<>`~;/\[\]]/.test(values.password);
  const length = values.password.length > 7;

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }
//$ ^ * . ? " { } |
  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map(input => (<FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}
        lowerCase = {lowerCase} upperCase = {upperCase} number = {number} specialCharacter = {specialCharacter}
        length = {length}
        />))}
        <button disabled = {checkValidity() === true ? false : true}>Submit</button>
      </form>
    </div>
  );
}

export default App;
