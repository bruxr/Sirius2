import { connect } from 'react-redux';
import { saveRepo } from '../actions/repo'
import { fetchAddons } from '../actions/addons';
import Repo from '../components/repo.jsx';

const mapStateToProps = (state) => {
    const repo = state.repo.toJS()
    const hosted = repo.hosted
    return {
        canDeploy: typeof state.sftp.get('object') !== 'undefined',
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
    dispatch(fetchAddons())
    return {
        onSetRepo: repo => {
            dispatch(saveRepo(repo))
        }
    }
}

const RepoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Repo)

export default RepoContainer