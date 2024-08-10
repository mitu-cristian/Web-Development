import {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import Loader from "../components/Loader";
import {setCredentials} from "../slices/authSlice";
import { useUpdateUserMutation } from '../slices/usersApiSlice';

const ProfilePage = () => {
  
    const [name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateProfile, {isLoading}] = useUpdateUserMutation();
    const {userInfo} = useSelector((state) => state.auth);

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, []);

    const submitHandler = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) 
            toast.error("Passwords do not match.");
        else {
          try {
              const res = await updateProfile({
                _id: userInfo._id,
                name, email, password
              }).unwrap();

              dispatch(setCredentials({...res}));
              toast.success("Updated");
          }
          catch(error) {
            toast.error(error?.data?.message || error.error);
            console.log(error);
          }
            }
        }

    return (
        <FormContainer>
            <h1>Update profile</h1>

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
                    Update
                </Button>

            </Form>
        </FormContainer>
  )
}

export default ProfilePage