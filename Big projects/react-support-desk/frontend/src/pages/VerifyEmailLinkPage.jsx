import {useSelector, useDispatch} from "react-redux";
import {verifyEmailLink, reset as authReset, selectAuthSlice} from "../features/auth/authSlice";
import {useParams, Link} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
// components
import SpinnerComponent from "../components/SpinnerComponent";

const VerifyEmailLinkPage = () => {
    const {isLoading: authIsLoading, isError: authIsError, isSuccess: authIsSuccess, message: authMessage} = useSelector(selectAuthSlice);
    const dispatch = useDispatch();
    const {userId, uniqueString} = useParams();

    useEffect(() => {
        if(authIsError)
            toast.error(authMessage);
        if(authIsSuccess) {
            return () => {
                dispatch(authReset());
            }
        }
    }, [authIsError, authMessage, authIsSuccess, dispatch])

    const verifyEmailLinkFunction = () => {
        dispatch(verifyEmailLink({userId, uniqueString}));
    }

    if(authIsLoading)
        return <SpinnerComponent/>

    return (
        <>
        <button onClick = {verifyEmailLinkFunction}>Activate your account</button>
        {(authIsSuccess && authMessage) ? 
            <><p>{authMessage.message}</p> 
            <Link to = "/login">Log in</Link></>
            : ""}
        </>
    )
};

export default VerifyEmailLinkPage;

