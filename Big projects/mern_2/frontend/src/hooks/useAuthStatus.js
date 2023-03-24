import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

export const useAuthStatus = ( ) =>{
    const [loggedIn, setLoggedIn] = useState(false);
    const [ceckingStatus, setCeckingStatus] = useState(true);

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(user)
            setLoggedIn(true);
        else
            setLoggedIn(false);
        setCeckingStatus(false)
        
    }, [user])

    return {loggedIn, ceckingStatus}
}
