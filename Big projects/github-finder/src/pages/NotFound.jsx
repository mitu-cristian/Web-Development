import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div>
            <h1>Ooops</h1>
            <p>404 - Page not found!</p>
            <Link to='/'><FaHome />Back to Home</Link>
        </div>
    )
}

export default NotFound
