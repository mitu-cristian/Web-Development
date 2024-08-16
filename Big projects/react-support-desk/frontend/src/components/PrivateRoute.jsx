import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStatus} from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {

    const {loggedIn, ceckingStatus} = useAuthStatus();

    if(ceckingStatus) 
        return <Spinner/>

  return loggedIn ? <Outlet/> : <Navigate to='/login'/>
}

export default PrivateRoute
