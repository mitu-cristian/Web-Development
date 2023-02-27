import { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

function UserResults() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`,
        )
        const data = await response.json();
        setUsers(data);
        setLoading(false);
    }

    if (!loading)
        return (
            <div>
                {users.map((user) => (<UserItem key={user.id} user={user} />))}
            </div>
        )
    else return <Spinner />
}

export default UserResults
