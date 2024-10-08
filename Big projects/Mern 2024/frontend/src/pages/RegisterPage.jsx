import {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import Loader from "../components/Loader";
import { useRegisterMutation } from '../slices/usersApiSlice';
import {setCredentials} from "../slices/authSlice";

const RegisterPage = () => {
  
    const [name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.auth);
    const [register, {isLoading}] = useRegisterMutation();

    useEffect(() => {
        if(userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) 
            toast.error("Passwords do not match.");
        else {
            try {
                const res = await register({name, email, password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate("/");
            }

            catch(error) {
                toast.error(error?.data?.message || error.error);
            }
        }
}

    return (
        <FormContainer>
            <h1>Sign up</h1>

            <Form onSubmit={submitHandler}>

                <Form.Group className='my-2' controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} 
                    onChange = {(event) => setName(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} 
                    onChange = {(event) => setEmail(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} 
                    onChange = {(event) => setPassword(event.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId="confirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} 
                    onChange = {(event) => setConfirmPassword(event.target.value)}></Form.Control>
                </Form.Group>

                {isLoading && <Loader/>}

                <Button type="submit" variant="primary" className="mt-3">
                    Sign up
                </Button>

                <Row className="py-3">
                    <Col>
                        Already Customer? <Link to="/login">Log in</Link>
                    </Col>
                </Row>

            </Form>
        </FormContainer>
  )
}

export default RegisterPage