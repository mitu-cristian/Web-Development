import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function UserItem({ user: { login, avatar_url } }) {
    return (
        <div className='card'>
            <div className='card-flexbox'>
                <div>
                    <div className="avatar">
                        <img src={avatar_url} />
                    </div>
                </div>

                <div>
                    <h2 className="card-title"> {login} </h2>
                    <Link className='card-link' to={`/users/${login}`}>Visit Profile</Link>
                </div>
            </div>

        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserItem
