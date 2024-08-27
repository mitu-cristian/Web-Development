import {useSelector, useDispatch} from "react-redux";
import {verifyEmailLink, reset as authReset, selectAuthSlice} from "../features/auth/authSlice";
import {useParams, Link} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
// components
import SpinnerComponent from "../components/SpinnerComponent";
import {Button} from "@carbon/react";

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
        {(authIsError && authMessage) ? <p> {authMessage} </p> : ""}
        {(authIsSuccess == false && authIsError == false) && <Button onClick = {verifyEmailLinkFunction}>Activate your account</Button>}
        {(authIsSuccess && authMessage) && 
            <><p>{authMessage.message}</p> 
            <Link to = "/login"> <Button>Log in</Button> </Link></>}
        </>
    )
};

export default VerifyEmailLinkPage;

