import "./register.css"
import faleza2 from "./img/faleza2.jpg";
import logo from "./img/portman-hotel-website-favicon-white.png"

import {useState, useEffect} from "react";

// import components
import Header from "../../components/Header/Header";
import RegisterFormInput from "../../components/RegisterFormInput/RegisterFormInput"; 


function Register() {

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

      const input1 = document.getElementById("1");
      const input2 = document.getElementById("2");
      const input3 = document.getElementById("3");
      const input4 = document.getElementById("4");
      const input5 = document.getElementById("5");
    
      let input1Validity;

      if(input1) {
          input1Validity = input1.checkValidity()
      }

      const inputs = [
        {
          id: 1,
          name: "firstname",
          type: "text",
          label: "Prenume",
          errorMessage: "Adăugați un prenume valid.",
          pattern: "^^[A-Za-z ]+$",
          required: true,
        },
        {
          id: 2,
          name: "lastname",
          type: "text",
          label: "Nume de familie",
          errorMessage: "Adăugați un nume de familie valid.",
          pattern: "^[A-Za-z ]+$",
          required: true
        },
        {
          id: 3,
          name: "email",
          type: "email",
          label: "Email",
          errorMessage: "Adăugați o adresă de email validă.",
          required: true
        },
        {
          id: 4,
          name: "password",
          type: "password",
          label: "Parola",
          errorMessage: "Parola trebuie să conțină",
          pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?\":{}|<>`~;/\[\]])",
          required: true
        },
        {
          id: 5,
          name: "confirmPassword",
          type: "password",
          label: "Reintroduceți parola",
          errorMessage: "Parolele diferă.",
          pattern: addBackslash(values.password),
          required: true
        }
    
      ]
    //$ ^ * . ? " { } |

    
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


  return (
    <>    
    <Header/>
    <main>
    <div className="container">
        <div className="register-container">
            <div className="container-img">
                <img src={faleza2}/>
                <div className="content">
                    <div className="text-sci">
                        <h2>Bun venit!<br/></h2>
                    </div>

                    <h2 className="logo-form">Hotelul Portman</h2>
                    <img src={logo} alt=""/>
                </div>

                <div className="logreg-box">
                    <div className="form-box">
                        <form action="#" className="register-form">
                            <h2>Înregistrare</h2>

                            <div className="inputs">
                                {inputs.map(input => (<RegisterFormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}
                                lowerCase = {lowerCase} upperCase = {upperCase} number = {number} specialCharacter = {specialCharacter}
                                length = {length}
                                />))}
                                <button disabled = {checkValidity() === true ? false : true}>Submit</button>
                            </div>
                            <div className="login-register">
                                <p>Ai deja cont? <a href="#">Autentificare</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
    </>

  )
}

export default Register
