import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ title }) {
    return (
        <nav>
            <div className="container">
                <div className='logo'>
                    <FaGithub className="github-icon" />
                    <Link to='/' className="title ghost-button"> {title} </Link>
                </div>
                <div className="links">
                    <Link to='/' className='ghost-button'>Home</Link>
                    <Link to='/about' className='ghost-button'>About</Link>
                </div>
            </div>
        </nav>

    )
}

Navbar.defaultProps = {
    title: 'Github Finder'
}

Navbar.propTypes = {
    title: PropTypes.string
}

export default Navbar
