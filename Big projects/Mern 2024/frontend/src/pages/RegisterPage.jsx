import {useState} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const RegisterPage = () => {
  
    const [name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("submit");
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

                <Button type="submit" variant="primary" className="mt-3">
                    Sign in
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