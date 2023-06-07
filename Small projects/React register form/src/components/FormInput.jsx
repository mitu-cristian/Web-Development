import "./formInput.css";
import {useState, useRef} from "react";

function FormInput(props) {

    const {lowerCase, upperCase, number, specialCharacter, length, label, errorMessage, onChange, id, ...inputProps} = props;
    const [focused, setFocused] = useState(false)
    const inputRef = useRef("")

    const handleFocus = (e) => {
        setFocused(true);
    }

  return (
    <div className="formInput">
      <label>{label}</label>
      <input {...inputProps} 
      id = {id}
        ref = {inputRef}
       onChange={onChange} onBlur = {handleFocus} focused = {focused.toString()}
      onFocus = {() => inputProps.name === "confirmPassword" && setFocused(true)}/>
      <span>{errorMessage}</span>
      {inputProps.name === "password"  && (
      <>
      <div className={lowerCase ? 'info checked' : 'info'}>The password contains a lower case letter.</div>
      <div className={upperCase ? 'info checked' : 'info'}>The password contains an upper case letter.</div>
      <div className={number ? 'info checked' : 'info'}>The password contains a number.</div>
      <div className={specialCharacter ? 'info checked' : 'info'}>The password contains one of these special characters !@#$%^&*(),.?":{}|&lt;&gt;`~;/[]</div>
      <div className={length ? 'info checked' : 'info'}>The password contains at least 8 characters.</div>
      </>)
      }
    </div>
  )
}

export default FormInput
