import { connect } from 'react-redux';
import { fetchAddons } from '../actions/addons';
import Repo from '../components/repo.jsx';

const mapStateToProps = (state) => {
    const repo = state.repo.toJS()
    const hosted = repo.hosted
    return {
        isEditing: repo.isEditing,
        isFetchingHosted: hosted.isFetching,
        hosted: {
            bitbucket: hosted.bitbucket,
            github: []
        },
        repo: repo.object
    }
}

const mapDispatchToProps = (dispatch) => {
    dispatch(fetchAddons());
    return {
        
    }
}

const RepoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Repo)

export default RepoContainer