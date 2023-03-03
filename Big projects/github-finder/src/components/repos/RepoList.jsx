import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

function RepoList({ repos }) {
    return (
        <div>
            <h2>Latest Repositories</h2>
            {repos.map((repo) => (
                <RepoItem key={repo.id} repo={repo} />
            ))}
        </div>
    )
}

RepoList.propTypes = {
    repos: PropTypes.array.isRequired
}

export default RepoList
