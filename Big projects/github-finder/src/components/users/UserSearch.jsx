import { useState, useContext } from 'react';
import GitHubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import Alert from '../layout/Alert';
import { searchUsers } from '../../context/github/GitHubActions';

function UserSearch() {

    const [text, setText] = useState('');

    const { users, dispatch } = useContext(GitHubContext)
    const { setAlert } = useContext(AlertContext)

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (text === '') {
            setAlert('Please enter something.', 'error')
        }

        else {
            dispatch({ type: 'SET_LOADING' })
            const users = await searchUsers(text);
            dispatch({ type: 'GET_USERS', payload: users })
            setText('');
        }

    }

    return (
        <div className="grid-userSearch">
            <div>
                <Alert />
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input className="form-input" placeholder='search' value={text} onChange={handleChange} />
                        <button className='button button-ghost search'>Go</button>
                    </div>
                </form>
            </div>
            {users.length > 0 && (<div>
                <button className='button button-ghost clear' onClick={() => dispatch({ type: 'CLEAR_USERS' })}>Clear</button>
            </div>)}
        </div>
    )
}

export default UserSearch
