import { useContext } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

function UserResults() {

    const { users, loading } = useContext(GithubContext)

    if (!loading)
        return (
            <div>
                {users.map((user) => (<UserItem key={user.id} user={user} />))}
            </div>
        )
    else return <Spinner />
}

export default UserResults
