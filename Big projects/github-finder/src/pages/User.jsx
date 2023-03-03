import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Spinner from '../components/layout/Spinner'
import { useEffect, useContext } from 'react';
import GithubContext from '../context/github/GithubContext';
import RepoList from '../components/repos/RepoList';
import { useParams } from 'react-router-dom';
import { getUser, getUserRepos } from '../context/github/GitHubActions';

function User() {

    const { user, loading, repos, dispatch } = useContext(GithubContext)

    const params = useParams()

    useEffect(() => {
        dispatch({ type: 'SET_LOADING' })
        const getUserData = async () => {
            const userData = await getUser(params.login)
            dispatch({ type: 'GET_USER', payload: userData })

            const userRepoData = await getUserRepos(params.login)
            dispatch({ type: 'GET_REPOS', payload: userRepoData })
        }

        getUserData();
    }, [dispatch, params.login])

    const {
        name, type, avatar_url, location, bio, blog, twitter_username,
        login, html_url, followers, following, public_repos, public_gists, hireable
    } = user;

    if (loading)
        return <Spinner />

    return (
        <div className="user-container">
            <Link to='/' className='ghost-button'>Back to Search</Link>
            <div className="grid-user">
                <div className="avatar-user-component">
                    {/* this class is not defined */}
                    <img src={avatar_url} />
                    {/* I want this text to be on the above image */}
                    <h2 className='card-title'>{name}</h2>
                    <p> {login} </p>
                </div>

                <div className='card-body'>
                    <h1> {name}
                        <div> {type} </div>

                        {hireable && (
                            <div> {hireable} </div>
                        )}
                    </h1>

                    <p> {bio} </p>

                    <div className='card-actions'>
                        <a href={html_url} target='_blank' rel='noreferrer'>
                            Visit GitHub Profile
                        </a>
                    </div>

                    <div className='stats'>
                        {location && (
                            <div className='stat'>
                                <div className='stat-title'>Location</div>
                                <div className='stat-value'> {location} </div>
                            </div>
                        )}

                        {blog && (
                            <div className='stat'>
                                <div className='stat-title'>Website</div>
                                <div className='stat-value'>
                                    <a href={`https://${blog}`} target="_blank" rel='noreferrer'>
                                        {blog}
                                    </a>
                                </div>
                            </div>
                        )}

                        {twitter_username && (
                            <div className='stat'>
                                <div className='stat-title'>Twitter</div>
                                <div className='stat-value'>
                                    <a href={`https://twitter.com/${twitter_username}`} target="_blank" rel='noreferrer'>
                                        {twitter_username}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                <div className='another-stat'>
                    <div className='stat-figure'>
                        <FaUsers />
                    </div>
                    <div className='stat-title'>Followers</div>
                    <div className='stat-value'> {followers} </div>
                </div>

                <div className='another-stat'>
                    <div className='stat-figure'>
                        <FaUserFriends />
                    </div>
                    <div className='stat-title'>Following</div>
                    <div className='stat-value'> {following} </div>
                </div>

                <div className='another-stat'>
                    <div className='stat-figure'>
                        <FaCodepen />
                    </div>
                    <div className='stat-title'>Public Repos</div>
                    <div className='stat-value'> {public_repos} </div>
                </div>

                <div className='another-stat'>
                    <div className='stat-figure'>
                        <FaStore />
                    </div>
                    <div className='stat-title'>Public Gists</div>
                    <div className='stat-value'> {public_gists} </div>
                </div>
            </div>
            <RepoList repos={repos} />
        </div>
    )
}

export default User
